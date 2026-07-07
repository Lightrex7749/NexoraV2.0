import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { faker } from '@faker-js/faker';

// Import Models
import User from './models/User.js';
import Startup from './models/Startup.js';
import Idea from './models/Idea.js';
import Event from './models/Event.js';
import MarketInsight from './models/MarketInsight.js';
import Investment from './models/Investment.js';
import Post from './models/Post.js';
import Job from './models/Job.js';
import Connection from './models/Connection.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sampleDataPath = path.join(__dirname, 'sample-data');

const loadJSON = (filename) => {
  const filePath = path.join(sampleDataPath, filename);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME
    });
    console.log('MongoDB connected for seeding.');

    // Clear existing collections
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Startup.deleteMany({}),
      Idea.deleteMany({}),
      Event.deleteMany({}),
      MarketInsight.deleteMany({}),
      Investment.deleteMany({}),
      Post.deleteMany({}),
      Job.deleteMany({}),
      Connection.deleteMany({})
    ]);

    // 1. Seed Users
    const sampleUsers = loadJSON('users.json');
    const enrichedUsers = sampleUsers.map((user, i) => ({
      ...user,
      avatarUrl: faker.image.avatar(),
      headline: faker.person.jobTitle(),
      industry: faker.commerce.department(),
      verified: i % 2 === 0, // Mock verified badge
      skills: [faker.word.noun(), faker.word.noun(), faker.word.noun()],
      workExperience: [
        {
          company: faker.company.name(),
          role: faker.person.jobTitle(),
          startDate: faker.date.past({ years: 5 }),
          endDate: faker.date.recent(),
          description: faker.lorem.paragraph()
        },
        {
          company: faker.company.name(),
          role: faker.person.jobTitle(),
          startDate: faker.date.past({ years: 10 }),
          endDate: faker.date.past({ years: 5 }),
          description: faker.lorem.paragraph()
        }
      ]
    }));

    // Add extra faker users to make it 20+
    for (let i = 0; i < 15; i++) {
      enrichedUsers.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        passwordHash: 'demo-hash',
        role: faker.helpers.arrayElement(['founder', 'mentor', 'investor']),
        bio: faker.person.bio(),
        location: faker.location.city(),
        avatarUrl: faker.image.avatar(),
        headline: faker.person.jobTitle(),
        industry: faker.commerce.department(),
        verified: faker.datatype.boolean(),
        skills: [faker.word.noun(), faker.word.noun()],
        workExperience: [
          {
            company: faker.company.name(),
            role: faker.person.jobTitle(),
            startDate: faker.date.past({ years: 3 }),
            endDate: new Date(),
            description: faker.lorem.sentence()
          }
        ]
      });
    }

    const createdUsers = await User.insertMany(enrichedUsers);
    console.log(`Seeded ${createdUsers.length} Users.`);

    // 2. Seed Startups
    const sampleStartups = loadJSON('startups.json');
    const enrichedStartups = sampleStartups.map(s => ({
      ...s,
      isPublished: true,
      founder: faker.helpers.arrayElement(createdUsers)._id
    }));
    for (let i = 0; i < 10; i++) {
      enrichedStartups.push({
        name: faker.company.name(),
        tagline: faker.company.catchPhrase(),
        isPublished: true,
        description: faker.company.catchPhraseDescriptor(),
        stage: faker.helpers.arrayElement(['idea', 'validation', 'growth', 'scale']),
        industry: faker.commerce.department(),
        location: faker.location.city(),
        website: faker.internet.url(),
        founder: faker.helpers.arrayElement(createdUsers)._id,
        teamSize: faker.number.int({ min: 1, max: 50 })
      });
    }
    const createdStartups = await Startup.insertMany(enrichedStartups);
    console.log(`Seeded ${createdStartups.length} Startups.`);

    // 3. Seed Ideas
    const sampleIdeas = loadJSON('ideas.json');
    const enrichedIdeas = sampleIdeas.map(idea => ({
      ...idea,
      author: faker.helpers.arrayElement(createdUsers)._id,
      status: faker.helpers.arrayElement(['submitted', 'reviewed', 'accepted'])
    }));
    await Idea.insertMany(enrichedIdeas);
    console.log(`Seeded ${enrichedIdeas.length} Ideas.`);

    // 4. Seed Posts for Community Tab
    const posts = [];
    for (let i = 0; i < 20; i++) {
      posts.push({
        content: faker.lorem.paragraph(),
        author: faker.helpers.arrayElement(createdUsers)._id,
        visibility: 'public'
      });
    }
    await Post.insertMany(posts);
    console.log(`Seeded ${posts.length} Posts.`);

    // 5. Seed Jobs for Team Tab
    const jobs = [];
    for (let i = 0; i < 15; i++) {
      jobs.push({
        company: faker.company.name(),
        postedBy: faker.helpers.arrayElement(createdUsers)._id,
        title: faker.person.jobTitle(),
        description: faker.lorem.paragraph(),
        type: faker.helpers.arrayElement(['full-time', 'part-time', 'contract']),
        location: faker.location.city(),
        remote: faker.datatype.boolean(),
        equity: `${faker.number.float({ min: 0.1, max: 2.0, fractionDigits: 1 })}%`,
        status: 'open'
      });
    }
    await Job.insertMany(jobs);
    console.log(`Seeded ${jobs.length} Jobs.`);

    // 6. Seed Events
    const sampleEvents = loadJSON('events.json').map(e => ({ ...e, organizer: createdUsers[0]._id, participants: [] }));
    if (sampleEvents.length > 0) await Event.insertMany(sampleEvents);
    console.log(`Seeded ${sampleEvents.length} Events.`);
    
    console.log('Database Seeding Complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding Failed:', err);
    process.exit(1);
  }
};

seedDatabase();
