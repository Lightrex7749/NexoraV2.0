import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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

export const StatusCheck = mongoose.model('status_checks', statusCheckSchema);
export const Newsletter = mongoose.model('newsletter', newsletterSchema, 'newsletter');
export const Contact = mongoose.model('contacts', contactSchema);
