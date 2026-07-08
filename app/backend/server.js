import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Import Routes
import systemRoutes from './routes/systemRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import startupRoutes from './routes/startupRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import documentRoutes from './routes/documentRoutes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

import connectDB from './config/db.js';

const app = express();
const port = process.env.PORT || 8001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
  credentials: true,
}));
app.use(express.json());

// Connect to Database
connectDB();

// Health check route for Render deployment & database tracking
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
  res.status(dbStatus === 1 ? 200 : 503).json({
    status: 'success',
    database: dbStatus === 1 ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

// Mount Routes
app.use('/api', systemRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/documents', documentRoutes);
// Additional routes will be mounted here as they are developed
// e.g. app.use('/api/v1/auth', authRoutes);
// e.g. app.use('/api/v1/startups', startupRoutes);

// 404 Route Not Found
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(port, () => {
  console.log(`Nexora API listening on http://0.0.0.0:${port}`);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

// Prevent unhandled promise rejections from crashing the server
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err.message || err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message || err);
});
