import mongoose from 'mongoose';

const startupCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: String,
    slug: { type: String, required: true, unique: true, lowercase: true }
  },
  { timestamps: true }
);

export default mongoose.model('StartupCategory', startupCategorySchema);
