import mongoose from 'mongoose';

const aiChatSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional, allows anonymous/global sessions for now
    title: { type: String, default: 'New Chat' },
    messages: [
      {
        role: { type: String, enum: ['user', 'ai'], required: true },
        content: { type: String, required: true },
        file: { type: String }, // Optional attached file name
        timestamp: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('AIChatSession', aiChatSessionSchema);
