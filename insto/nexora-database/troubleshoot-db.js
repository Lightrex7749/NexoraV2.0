#!/usr/bin/env node

/**
 * MongoDB Connection Troubleshooter
 * Run this script to diagnose connection issues
 */

import dns from 'dns';
import net from 'net';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('\n🔍 MongoDB Connection Troubleshooter\n');
console.log('=' .repeat(60));

// Step 1: Verify URI exists
console.log('\n1️⃣  Checking .env configuration...');
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env file');
  process.exit(1);
}
console.log('✓ MONGODB_URI found');
console.log(`   URI: ${MONGODB_URI.substring(0, 60)}...`);

// Step 2: Parse connection string
console.log('\n2️⃣  Parsing connection string...');
try {
  const url = new URL(MONGODB_URI);
  const host = url.hostname;
  const username = url.username;
  const password = url.password;
  const database = url.pathname.split('/')[1] || '(default)';
  
  console.log('✓ Connection string parsed');
  console.log(`   Protocol: ${url.protocol}`);
  console.log(`   Host: ${host}`);
  console.log(`   Username: ${username}`);
  console.log(`   Password: ${password ? '(hidden)' : '(none)'}`);
  console.log(`   Database: ${database}`);
} catch (e) {
  console.error(`❌ Invalid connection string: ${e.message}`);
  process.exit(1);
}

// Step 3: Check DNS resolution
console.log('\n3️⃣  Checking DNS resolution...');
const host = new URL(MONGODB_URI).hostname;
dns.lookup(host, (err, address) => {
  if (err) {
    console.error(`❌ DNS resolution failed: ${err.message}`);
    console.error('   This could mean:');
    console.error('   - Your DNS is misconfigured');
    console.error('   - MongoDB Atlas cluster name is wrong');
    console.error('   - Network firewall is blocking DNS');
  } else {
    console.log(`✓ DNS resolved: ${host} → ${address}`);
    
    // Step 4: Test network connectivity
    console.log('\n4️⃣  Testing network connectivity...');
    const socket = net.createConnection(27017, address, () => {
      console.log(`✓ Network port 27017 is reachable`);
      socket.destroy();
      
      // Step 5: Test MongoDB connection
      testMongoDBConnection();
    });
    
    socket.on('error', (err) => {
      console.error(`❌ Network connection failed: ${err.message}`);
      console.error('   This could mean:');
      console.error('   - Your firewall is blocking MongoDB');
      console.error('   - MongoDB port 27017 is not accessible');
      console.error('   - Your IP might not be whitelisted');
      testMongoDBConnection();
    });
    
    socket.setTimeout(5000);
  }
});

// Step 5: Test actual MongoDB connection
async function testMongoDBConnection() {
  console.log('\n5️⃣  Testing MongoDB connection...');
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    });
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Port: ${conn.connection.port}`);
    console.log(`   Database: ${conn.connection.name}`);
    
    // Show collections
    console.log('\n   Collections in database:');
    const collections = await conn.connection.listCollections();
    collections.forEach((col, idx) => {
      console.log(`   ${idx + 1}. ${col.name}`);
    });
    
    await mongoose.disconnect();
    console.log('\n✓ Disconnected successfully');
    console.log('\n' + '='.repeat(60));
    console.log('✅ All checks passed! Your database is working.\n');
    process.exit(0);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}\n`);
    
    console.log('📋 Common Solutions:\n');
    console.log('1. IP Whitelist Issue:');
    console.log('   - Go to MongoDB Atlas → Security → Network Access');
    console.log('   - Add your IP address or use 0.0.0.0/0 (development only)');
    console.log('   - Your current IP may have changed\n');
    
    console.log('2. Cluster Not Running:');
    console.log('   - Check if your MongoDB Atlas cluster is active');
    console.log('   - Paused clusters cannot accept connections\n');
    
    console.log('3. Invalid Credentials:');
    console.log('   - Verify username and password in .env');
    console.log('   - Check MongoDB Atlas database user credentials\n');
    
    console.log('4. Wrong Connection String:');
    console.log('   - Copy the correct URI from MongoDB Atlas');
    console.log('   - Dashboard → Connect → Drivers → Node.js\n');
    
    console.log('5. Network/Firewall:');
    console.log('   - Check if your network blocks MongoDB (port 27017)');
    console.log('   - Try connecting from a different network\n');
    
    console.log('='.repeat(60));
    process.exit(1);
  }
}
