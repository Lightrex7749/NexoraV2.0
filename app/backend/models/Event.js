import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    eventType: {
      type: String,
      enum: ['Hackathon', 'Workshop', 'Demo Day', 'Pitch Day', 'Networking', 'Mentorship']
    },
    mode: {
      type: String,
      enum: ['Online', 'Offline', 'Hybrid']
    },
    location: {
      type: String
    },
    meetingLink: {
      type: String
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    maxParticipants: {
      type: Number
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    status: {
      type: String,
      enum: ['Upcoming', 'Live', 'Completed', 'Cancelled'],
      default: 'Upcoming'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
