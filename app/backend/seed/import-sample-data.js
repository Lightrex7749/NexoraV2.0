import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Startup from '../models/Startup.js';
import StartupCategory from '../models/StartupCategory.js';
import MarketInsight from '../models/MarketInsight.js';
import Idea from '../models/Idea.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const sampleDataDir = path.join(__dirname, '..', '..', '..', 'nexora', 'nexora-database', 'sample-data');

const loadJson = (fileName) => {
  const filePath = path.join(sampleDataDir, fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const seedFromSampleData = async () => {
  await connectDB();

  const users = loadJson('users.json');
  const startups = loadJson('startups.json');
  const marketInsights = loadJson('marketInsights.json');
  const ideas = loadJson('ideas.json');

  // also investments and events if needed later

  try { await Idea.collection.dropIndexes(); } catch (e) {}

  await User.deleteMany({});
  await Startup.deleteMany({});
  await StartupCategory.deleteMany({});
  await MarketInsight.deleteMany({});
  await Idea.deleteMany({});

  const insertedUsers = await User.insertMany(users, { ordered: false });

  const categories = await StartupCategory.insertMany([
    { name: 'HealthTech', description: 'Healthcare technology startups', slug: 'healthtech' },
    { name: 'Fintech', description: 'Financial technology startups', slug: 'fintech' },
    { name: 'EdTech', description: 'Educational technology startups', slug: 'edtech' },
    { name: 'ClimateTech', description: 'Sustainability and clean technology startups', slug: 'climatetech' },
    { name: 'AI SaaS', description: 'Artificial intelligence software startups', slug: 'ai-saas' }
  ]);

  const startupsWithRefs = startups.map((startup, index) => ({
    ...startup,
    founder: insertedUsers[index % insertedUsers.length]._id,
    category: categories[index % categories.length]._id
  }));

  const insertedStartups = await Startup.insertMany(startupsWithRefs, { ordered: false });
  const insertedInsights = await MarketInsight.insertMany(marketInsights, { ordered: false });

  const ideasWithRefs = ideas.map((idea, index) => ({
    ...idea,
    author: insertedUsers[index % insertedUsers.length]._id,
    startup: insertedStartups[index % insertedStartups.length]._id,
    tags: idea.tags || [idea.category.toLowerCase().replace(/\s+/g, '-')],
    status: ['draft', 'submitted', 'reviewed', 'accepted'][index % 4]
  }));

  const insertedIdeas = await Idea.insertMany(ideasWithRefs, { ordered: false });

  console.log('Sample data imported successfully');
  console.log(`Users: ${insertedUsers.length}`);
  console.log(`Startups: ${insertedStartups.length}`);
  console.log(`Market insights: ${insertedInsights.length}`);
  console.log(`Ideas: ${insertedIdeas.length}`);
};

seedFromSampleData().catch((error) => {
  console.error('Failed to import sample data:', error);
  process.exit(1);
});
