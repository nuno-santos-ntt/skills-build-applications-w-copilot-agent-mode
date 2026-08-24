import { Router } from 'express';
import { LeaderboardEntry } from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const entries = await LeaderboardEntry.find().sort({ rank: 1 }).populate('user').lean();
    response.json(entries);
  } catch (error) {
    next(error);
  }
});

export default router;