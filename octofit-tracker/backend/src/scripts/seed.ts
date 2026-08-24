import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const teams = await Team.insertMany([
      { name: 'OctoFit Runners', mascot: 'Fleet Fox', memberCount: 2 },
      { name: 'Core Crushers', mascot: 'Iron Lynx', memberCount: 2 },
      { name: 'Flex Appeal', mascot: 'Power Panda', memberCount: 1 }
    ]);

    const users = await User.insertMany([
      {
        displayName: 'Maya Chen',
        email: 'maya.chen@example.com',
        username: 'mayafit',
        team: teams[0]._id
      },
      {
        displayName: 'Jordan Blake',
        email: 'jordan.blake@example.com',
        username: 'jblake',
        team: teams[1]._id
      },
      {
        displayName: 'Priya Shah',
        email: 'priya.shah@example.com',
        username: 'priyapace',
        team: teams[0]._id
      },
      {
        displayName: 'Noah Rivera',
        email: 'noah.rivera@example.com',
        username: 'riverastrong',
        team: teams[1]._id
      },
      {
        displayName: 'Avery Morgan',
        email: 'avery.morgan@example.com',
        username: 'averymoves',
        team: teams[2]._id
      }
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        activityType: 'Trail Run',
        durationMinutes: 42,
        caloriesBurned: 430,
        activityDate: new Date('2026-08-18T07:30:00Z')
      },
      {
        user: users[1]._id,
        activityType: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 520,
        activityDate: new Date('2026-08-19T18:15:00Z')
      },
      {
        user: users[2]._id,
        activityType: 'Cycling',
        durationMinutes: 68,
        caloriesBurned: 610,
        activityDate: new Date('2026-08-20T06:45:00Z')
      },
      {
        user: users[3]._id,
        activityType: 'Rowing',
        durationMinutes: 35,
        caloriesBurned: 390,
        activityDate: new Date('2026-08-21T12:00:00Z')
      },
      {
        user: users[4]._id,
        activityType: 'Yoga Flow',
        durationMinutes: 50,
        caloriesBurned: 260,
        activityDate: new Date('2026-08-22T09:00:00Z')
      }
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[2]._id, rank: 1, score: 1920 },
      { user: users[0]._id, rank: 2, score: 1785 },
      { user: users[1]._id, rank: 3, score: 1690 },
      { user: users[3]._id, rank: 4, score: 1515 },
      { user: users[4]._id, rank: 5, score: 1320 }
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility Reset',
        description: 'A gentle routine for hips, shoulders, and spine before the workday.',
        difficulty: 'beginner',
        durationMinutes: 20
      },
      {
        title: 'Lunch Break HIIT',
        description: 'Bodyweight intervals with squats, pushups, mountain climbers, and planks.',
        difficulty: 'intermediate',
        durationMinutes: 30
      },
      {
        title: 'Endurance Builder Ride',
        description: 'A steady cycling session focused on aerobic conditioning and cadence.',
        difficulty: 'intermediate',
        durationMinutes: 45
      },
      {
        title: 'Advanced Strength Circuit',
        description: 'Compound lifts and conditioning blocks for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 60
      }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
