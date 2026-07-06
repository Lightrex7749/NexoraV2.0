import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup' },
    scheduledAt: Date,
    location: String,
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Meeting', meetingSchema);
