import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup' },
    tags: [String],
    attachmentUrl: String,
    status: { type: String, enum: ['draft', 'submitted', 'reviewed', 'accepted'], default: 'draft' },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

ideaSchema.index({ title: 'text', description: 'text' });
ideaSchema.index({ tags: 1 });
ideaSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('Idea', ideaSchema);
