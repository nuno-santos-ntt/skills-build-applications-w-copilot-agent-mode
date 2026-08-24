import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);