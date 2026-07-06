import mongoose from 'mongoose';

const startupMemberSchema = new mongoose.Schema(
  {
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['founder', 'cofounder', 'member', 'advisor'], default: 'member' },
    joinedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('StartupMember', startupMemberSchema);
