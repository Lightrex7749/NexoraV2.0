import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    const dbName = process.env.DB_NAME;

    if (!mongoUrl || !dbName) {
      throw new Error('MONGO_URL or DB_NAME is not set in .env file');
    }

    console.log('Connecting to MongoDB (Local)...');
    console.log(`URI: ${mongoUrl}`);

    const conn = await mongoose.connect(mongoUrl, {
      dbName,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`);
    console.log(`✓ Database: ${conn.connection.name}`);
    return conn.connection;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    throw error;
  }
};

export default connectDB;
