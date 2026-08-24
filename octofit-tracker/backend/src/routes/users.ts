import { Router } from 'express';
import { User } from '../models/User.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const users = await User.find().lean();
    response.json(users);
  } catch (error) {
    next(error);
  }
});

export default router;