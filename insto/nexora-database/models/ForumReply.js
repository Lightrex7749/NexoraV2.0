import mongoose from 'mongoose';

const forumReplySchema = new mongoose.Schema(
  {
    forum: { type: mongoose.Schema.Types.ObjectId, ref: 'Forum', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('ForumReply', forumReplySchema);
