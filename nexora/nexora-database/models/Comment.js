import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetType: { type: String, enum: ['Idea', 'Startup', 'Post'], required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

commentSchema.index({ targetType: 1, targetId: 1, createdAt: -1 });
commentSchema.index({ author: 1 });

export default mongoose.model('Comment', commentSchema);
