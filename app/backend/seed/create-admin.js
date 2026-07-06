import dotenv from 'dotenv';
import crypto from 'crypto';
import connectDB from '../config/db.js';
import User from '../models/User.js';

dotenv.config();

const hashPassword = (password) => crypto.createHash('sha256').update(password).digest('hex');

const createAdmin = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin12345';

  const existing = await User.findOne({ email });
  if (existing) {
    existing.role = 'admin';
    existing.isVerified = true;
    existing.isActive = true;
    existing.passwordHash = hashPassword(password);
    await existing.save();
    console.log('Admin user updated successfully');
    console.log('Email:', email);
    console.log('Password:', password);
    process.exit(0);
  }

  const passwordHash = hashPassword(password);
  await User.create({
    name: 'Admin User',
    email,
    passwordHash,
    role: 'admin',
    isVerified: true,
    isActive: true,
  });

  console.log('Admin user created successfully');
  console.log('Email:', email);
  console.log('Password:', password);
  process.exit(0);
};

createAdmin().catch((error) => {
  console.error('Failed to create admin user:', error);
  process.exit(1);
});
