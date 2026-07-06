import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import StartupCategory from '../models/StartupCategory.js';
import MarketInsight from '../models/MarketInsight.js';

dotenv.config();

const seed = async () => {
  await connectDB();

  await User.deleteMany({});
  await StartupCategory.deleteMany({});
  await MarketInsight.deleteMany({});

  const categories = await StartupCategory.insertMany([
    { name: 'HealthTech', description: 'Healthcare technology startups', slug: 'healthtech' },
    { name: 'Fintech', description: 'Financial technology startups', slug: 'fintech' },
    { name: 'EdTech', description: 'Educational technology startups', slug: 'edtech' },
    { name: 'ClimateTech', description: 'Sustainability and clean technology startups', slug: 'climatetech' },
    { name: 'AI SaaS', description: 'Artificial intelligence software startups', slug: 'ai-saas' }
  ]);

  const users = await User.insertMany([
    {
      name: 'Ava Chen',
      email: 'ava@example.com',
      passwordHash: 'demo-hash',
      role: 'founder',
      bio: 'Founder of a health-tech startup focused on patient engagement.',
      location: 'Singapore',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      isActive: true
    },
    {
      name: 'Daniel Kim',
      email: 'daniel@example.com',
      passwordHash: 'demo-hash',
      role: 'mentor',
      bio: 'Serial entrepreneur and growth advisor for early-stage startups.',
      location: 'San Francisco',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      isActive: true
    },
    {
      name: 'Sara Malik',
      email: 'sara@example.com',
      passwordHash: 'demo-hash',
      role: 'investor',
      bio: 'Angel investor backing AI and fintech teams.',
      location: 'Dubai',
      avatarUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df',
      isActive: true
    },
    {
      name: 'Noah Patel',
      email: 'noah@example.com',
      passwordHash: 'demo-hash',
      role: 'admin',
      bio: 'Platform admin helping manage startup programs.',
      location: 'London',
      isActive: true
    }
  ]);

  const insights = await MarketInsight.insertMany([
    {
      title: 'AI adoption in early-stage startups',
      summary: 'Founders are prioritizing AI tools for operations and customer support.',
      category: 'Technology',
      tags: ['AI', 'startups', 'operations'],
      publishedAt: new Date('2026-06-01')
    },
    {
      title: 'Fintech founders are raising faster in 2026',
      summary: 'Investor appetite for embedded finance tools remains strong across emerging markets.',
      category: 'Fintech',
      tags: ['fintech', 'fundraising', 'investors'],
      publishedAt: new Date('2026-06-15')
    },
    {
      title: 'Climate-tech startups gain traction with enterprise pilots',
      summary: 'More B2B customers are testing sustainability software before full deployment.',
      category: 'ClimateTech',
      tags: ['climate', 'sustainability', 'enterprise'],
      publishedAt: new Date('2026-06-20')
    },
    {
      title: 'EdTech platforms are expanding into workforce learning',
      summary: 'Companies are investing in upskilling and internal training platforms.',
      category: 'Education',
      tags: ['edtech', 'learning', 'workforce'],
      publishedAt: new Date('2026-06-25')
    }
  ]);

  console.log('Seed complete');
  console.log('Created categories:', categories.length);
  console.log('Created users:', users.length);
  console.log('Created insights:', insights.length);
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
