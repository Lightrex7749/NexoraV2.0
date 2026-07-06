import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const port = 8001;

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

// Mongoose Schemas & Models
const statusCheckSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  client_name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { versionKey: false });

const newsletterSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  email: { type: String, required: true },
  source: { type: String, default: 'landing' },
  created_at: { type: Date, default: Date.now }
}, { versionKey: false });

const contactSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
}, { versionKey: false });

const StatusCheck = mongoose.model('status_checks', statusCheckSchema);
const Newsletter = mongoose.model('newsletter', newsletterSchema, 'newsletter');
const Contact = mongoose.model('contacts', contactSchema);

const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Routes
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.json({ message: "Nexora API — From Idea to Impact.", status: "ok" });
});

apiRouter.get('/health', (req, res) => {
  res.json({ status: "healthy", service: "nexora-api" });
});

apiRouter.post('/status', async (req, res) => {
  try {
    const { client_name } = req.body;
    if (!client_name) {
      return res.status(422).json({ detail: "client_name is required" });
    }
    const statusObj = new StatusCheck({ client_name });
    await statusObj.save();
    
    // Convert to plain object to match the FastAPI response format
    const responseObj = statusObj.toObject();
    delete responseObj._id;
    responseObj.timestamp = responseObj.timestamp.toISOString();
    
    res.json(responseObj);
  } catch (err) {
    res.status(500).json({ detail: err.message });
  }
});

apiRouter.get('/status', async (req, res) => {
  try {
    const rows = await StatusCheck.find({}, { _id: 0 }).limit(1000).lean();
    // Return timestamp as string to match FastAPI
    const formattedRows = rows.map(r => ({
      ...r,
      timestamp: r.timestamp.toISOString()
    }));
    res.json(formattedRows);
  } catch (err) {
    res.status(500).json({ detail: err.message });
  }
});

apiRouter.post('/newsletter', async (req, res) => {
  try {
    const { email, source } = req.body;
    if (!email || !emailRegex.test(email.trim().toLowerCase())) {
      return res.status(400).json({ detail: "Please provide a valid email address." });
    }
    
    const emailLower = email.trim().toLowerCase();
    const existing = await Newsletter.findOne({ email: emailLower });
    
    if (existing) {
      return res.json({ success: true, message: "You're already on the list. Stay tuned.", duplicate: true });
    }
    
    const entry = new Newsletter({ email: emailLower, source: source || 'landing' });
    await entry.save();
    
    res.json({ success: true, message: "You're in. We'll be in touch.", duplicate: false });
  } catch (err) {
    res.status(500).json({ detail: err.message });
  }
});

apiRouter.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!email || !emailRegex.test(email.trim().toLowerCase())) {
      return res.status(400).json({ detail: "Please provide a valid email address." });
    }
    if (!name || !name.trim() || !message || !message.trim()) {
      return res.status(400).json({ detail: "Name and message are required." });
    }
    
    const entry = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });
    
    await entry.save();
    res.json({ success: true, message: "Thanks — a member of our team will reach out shortly." });
  } catch (err) {
    res.status(500).json({ detail: err.message });
  }
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Nexora API listening on http://0.0.0.0:${port}`);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
