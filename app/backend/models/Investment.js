import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema(
  {
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    startup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
      required: true
    },
    investmentRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InvestmentRequest',
      optional: true
    },
    amount: {
      type: Number,
      required: true
    },
    equityPercentage: {
      type: Number
    },
    fundingRound: {
      type: String,
      enum: ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C']
    },
    currentValue: {
      type: Number
    },
    status: {
      type: String,
      enum: ['Active', 'Exited', 'Cancelled'],
      default: 'Active'
    },
    investedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model('Investment', investmentSchema);
