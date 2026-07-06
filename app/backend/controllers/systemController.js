import { StatusCheck, Newsletter, Contact } from '../models/System.js';

const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export const getHealth = (req, res) => {
  res.json({ status: "healthy", service: "nexora-api" });
};

export const createStatus = async (req, res) => {
  try {
    const { client_name } = req.body;
    if (!client_name) {
      return res.status(422).json({ detail: "client_name is required" });
    }
    const statusObj = new StatusCheck({ client_name });
    await statusObj.save();
    
    const responseObj = statusObj.toObject();
    delete responseObj._id;
    responseObj.timestamp = responseObj.timestamp.toISOString();
    
    res.json(responseObj);
  } catch (err) {
    res.status(500).json({ detail: err.message });
  }
};

export const getStatus = async (req, res) => {
  try {
    const rows = await StatusCheck.find({}, { _id: 0 }).limit(1000).lean();
    const formattedRows = rows.map(r => ({
      ...r,
      timestamp: r.timestamp.toISOString()
    }));
    res.json(formattedRows);
  } catch (err) {
    res.status(500).json({ detail: err.message });
  }
};

export const subscribeNewsletter = async (req, res) => {
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
};

export const submitContact = async (req, res) => {
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
};
