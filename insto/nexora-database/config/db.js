import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not set in .env file');
    }

    console.log('Connecting to MongoDB (Local)...');
    console.log(`URI: ${process.env.MONGODB_URI}`);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`);
    console.log(`✓ Database: ${conn.connection.name}`);
    return conn.connection;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure MongoDB is running locally');
    console.error('   - Windows: Run "mongod" in terminal');
    console.error('   - Mac: brew services start mongodb-community');
    console.error('   - Linux: sudo systemctl start mongod');
    console.error('2. Default connection: mongodb://localhost:27017');
    console.error('3. Open MongoDB Compass to verify connection');
    throw error;
  }
};

export default connectDB;