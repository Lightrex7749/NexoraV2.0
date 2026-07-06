import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema(
  {
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
    title: { type: String, required: true, trim: true },
    description: String,
    dueDate: Date,
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' }
  },
  { timestamps: true }
);

export default mongoose.model('Milestone', milestoneSchema);
