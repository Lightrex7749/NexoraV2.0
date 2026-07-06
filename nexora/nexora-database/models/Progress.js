import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
    milestone: { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' },
    summary: { type: String, required: true },
    completionPercent: { type: Number, min: 0, max: 100, default: 0 },
    recordedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Progress', progressSchema);
