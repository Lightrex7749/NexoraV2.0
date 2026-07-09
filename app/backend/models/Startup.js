import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    tagline: String,
    description: String,
    idea: String,
    founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'StartupCategory' },
    stage: { type: String, enum: ['idea', 'validation', 'growth', 'scale'], default: 'idea' },
    feature: String,
    website: String,
    location: String,
    logoUrl: String,
    hashtags: [String],
    aiScore: Number,
    aiSummary: String,
    isPublished: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

startupSchema.index({ name: 'text', tagline: 'text', description: 'text', idea: 'text', feature: 'text', hashtags: 'text' }, { name: 'StartupSearchIndex', weights: { name: 10, tagline: 5, description: 2, idea: 4, feature: 1, hashtags: 1 } });
startupSchema.index({ stage: 1, isPublished: 1 });

export default mongoose.model('Startup', startupSchema);
