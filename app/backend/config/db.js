import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    const dbName = process.env.DB_NAME;

    if (!mongoUrl || !dbName) {
      console.error("MONGO_URL and DB_NAME environment variables are required.");
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoUrl, {
      dbName,
      // Atlas-specific connection options for better stability
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4 // Use IPv4, skip trying IPv6
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...');
    });

  } catch (error) {
    console.error(`Database Connection Failed: ${error.message}`);
    console.warn("The server is continuing to run, but database-dependent routes will fail.");
    // Removed process.exit(1) so the backend stays alive in restrictive sandbox environments
  }
};

export default connectDB;
