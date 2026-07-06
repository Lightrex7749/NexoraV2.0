import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetType: { type: String, enum: ['Idea', 'Startup', 'Post'], required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

bookmarkSchema.index({ user: 1, targetType: 1, targetId: 1 }, { unique: true });
bookmarkSchema.index({ targetType: 1, targetId: 1 });

export default mongoose.model('Bookmark', bookmarkSchema);
