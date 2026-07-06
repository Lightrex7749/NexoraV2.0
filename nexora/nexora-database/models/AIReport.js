import mongoose from 'mongoose';

const aiReportSchema = new mongoose.Schema(
  {
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true },
    generatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('AIReport', aiReportSchema);
