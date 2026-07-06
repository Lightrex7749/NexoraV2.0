import mongoose from 'mongoose';

const mentorAssignmentSchema = new mongoose.Schema(
  {
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
    status: { type: String, enum: ['pending', 'active', 'completed', 'cancelled'], default: 'pending' },
    notes: String,
    assignedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('MentorAssignment', mentorAssignmentSchema);
