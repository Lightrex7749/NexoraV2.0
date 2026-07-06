import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Import Routes
import systemRoutes from './routes/systemRoutes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 8001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection
const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

if (!mongoUrl || !dbName) {
  console.error("MONGO_URL and DB_NAME environment variables are required.");
  process.exit(1);
}

mongoose.connect(mongoUrl, { dbName })
  .then(() => console.log(`Connected to MongoDB database: ${dbName}`))
  .catch(err => console.error("MongoDB connection error:", err));

// Mount Routes
app.use('/api', systemRoutes);
// Additional routes will be mounted here as they are developed
// e.g. app.use('/api/v1/auth', authRoutes);
// e.g. app.use('/api/v1/startups', startupRoutes);

app.listen(port, () => {
  console.log(`Nexora API listening on http://0.0.0.0:${port}`);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
