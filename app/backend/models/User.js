import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['founder', 'mentor', 'investor', 'admin', 'user'], default: 'user' },
    avatarUrl: String,
    bio: String,
    headline: String,
    location: String,
    industry: String,
    resumeUrl: String,
    skills: [String],
    interests: [String],
    workExperience: [{
      company: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String
    }],
    projects: [{
      name: String,
      url: String,
      description: String
    }],
    isActive: { type: Boolean, default: true },
    lastLoginAt: Date,
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

userSchema.index({ role: 1, isActive: 1 });

export default mongoose.model('User', userSchema);
