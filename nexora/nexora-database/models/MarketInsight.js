import mongoose from 'mongoose';

const marketInsightSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true },
    category: String,
    tags: [String],
    publishedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('MarketInsight', marketInsightSchema);
