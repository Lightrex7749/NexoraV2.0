import mongoose from 'mongoose';

const userPreferenceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    interests: [String],
    preferredCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StartupCategory' }],
    notificationsEnabled: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('UserPreference', userPreferenceSchema);
