import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    coverLetter: String,
    status: { type: String, enum: ['applied', 'reviewed', 'accepted', 'rejected'], default: 'applied' },
    appliedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Application', applicationSchema);
