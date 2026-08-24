import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true }
  },
  { timestamps: true }
);

export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);