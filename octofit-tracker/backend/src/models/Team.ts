import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    memberCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Team = mongoose.model('Team', teamSchema);