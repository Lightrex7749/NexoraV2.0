import mongoose from 'mongoose';

const savedInsightSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    insight: { type: mongoose.Schema.Types.ObjectId, ref: 'MarketInsight', required: true },
    savedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('SavedInsight', savedInsightSchema);
