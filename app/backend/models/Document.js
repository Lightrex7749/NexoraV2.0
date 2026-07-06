import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup' },
    fileUrl: String,
    type: { type: String, enum: ['pitch', 'plan', 'legal', 'financial', 'other'], default: 'other' },
    version: { type: Number, default: 1 },
    uploadedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Document', documentSchema);
