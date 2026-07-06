// Central mock data source used by every dashboard/screen.

export const CURRENT_USER = {
  id: 'u_demo',
  name: 'Ava Mercer',
  handle: '@ava',
  role: 'Founder',
  roles: ['Founder', 'Mentor'],
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
  headline: 'Building the future of agentic commerce',
  location: 'Berlin, DE',
  industry: 'AI / Commerce',
  skills: ['Product', 'AI', 'Growth'],
};

export const STARTUPS = [
  { id: 's1', name: 'Aether Labs', tagline: 'Agentic checkout for the open web', industry: 'AI Commerce', stage: 'MVP', status: 'APPROVED', logo: 'AL', owner: 'Ava Mercer', progress: 62 },
  { id: 's2', name: 'Kilo Health', tagline: 'Precision preventive care via wearables', industry: 'HealthTech', stage: 'Growth', status: 'APPROVED', logo: 'KH', owner: 'Ravi Menon', progress: 78 },
  { id: 's3', name: 'Loop Robotics', tagline: 'Warehouse robots that learn overnight', industry: 'Robotics', stage: 'Launch', status: 'APPROVED', logo: 'LR', owner: 'Iris Chen', progress: 55 },
  { id: 's4', name: 'Verdant', tagline: 'Carbon accounting for supply chains', industry: 'ClimateTech', stage: 'Validation', status: 'PENDING', logo: 'VR', owner: 'Sam Okoye', progress: 32 },
  { id: 's5', name: 'Fable', tagline: 'AI storytelling studio for creators', industry: 'Media', stage: 'Idea', status: 'PENDING', logo: 'FB', owner: 'Nora Aziz', progress: 12 },
  { id: 's6', name: 'Northwind Capital', tagline: 'Alt-data trading intelligence', industry: 'FinTech', stage: 'Funding', status: 'APPROVED', logo: 'NW', owner: 'Ken Ibrahim', progress: 88 },
];

export const PEOPLE = [
  { id: 'p1', name: 'Elena Rossi', role: 'Investor', firm: 'Northlight Ventures', location: 'London', industry: 'B2B SaaS', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', verified: true },
  { id: 'p2', name: 'Marcus Wei', role: 'Mentor', firm: 'ex-Stripe', location: 'Singapore', industry: 'Payments', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop', verified: true },
  { id: 'p3', name: 'Priya Shah', role: 'Founder', firm: 'Aurorae', location: 'Mumbai', industry: 'AI', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop', verified: false },
  { id: 'p4', name: 'Jonas Berg', role: 'Team Member', firm: 'ML Engineer', location: 'Stockholm', industry: 'AI/ML', avatar: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=200&h=200&fit=crop', verified: false },
  { id: 'p5', name: 'Yuki Tanaka', role: 'Mentor', firm: 'ex-Sequoia', location: 'Tokyo', industry: 'Venture', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&fit=crop', verified: true },
  { id: 'p6', name: 'Diego Alvarez', role: 'Investor', firm: 'Meridian Fund', location: 'Madrid', industry: 'ClimateTech', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', verified: true },
];

export const POSTS = [
  { id: 'po1', author: 'Priya Shah', category: 'Fundraising', title: 'What signals actually move seed-stage investors in 2026?', body: 'We ran 40 conversations across our raise. Here are the pattern-breaks…', votes: 214, comments: 42, time: '2h' },
  { id: 'po2', author: 'Marcus Wei', category: 'Product', title: 'Stop shipping features. Start shipping decisions.', body: 'Every roadmap item should collapse an open decision, not fill a sprint.', votes: 180, comments: 31, time: '5h' },
  { id: 'po3', author: 'Elena Rossi', category: 'Market', title: 'Vertical AI is where the alpha is — but only in these 4 shapes.', body: 'A framework we use at Northlight when scoring vertical AI plays…', votes: 156, comments: 27, time: '1d' },
  { id: 'po4', author: 'Ava Mercer', category: 'Building', title: 'Weekly log: turning a demo into a design partner.', body: 'How we converted a 20-minute demo into a 6-figure design-partner deal.', votes: 133, comments: 18, time: '1d' },
];

export const JOBS = [
  { id: 'j1', startup: 'Aether Labs', title: 'Founding ML Engineer', skills: ['Python', 'LLMs', 'RAG'], location: 'Remote / EU', equity: '0.5–1.5%', applicants: 24 },
  { id: 'j2', startup: 'Kilo Health', title: 'Design Engineer', skills: ['React', 'Motion', 'Systems'], location: 'Berlin', equity: '0.2–0.5%', applicants: 41 },
  { id: 'j3', startup: 'Loop Robotics', title: 'Co-founder / Ops', skills: ['GTM', 'Ops', 'Hardware'], location: 'SF', equity: '5–10%', applicants: 8 },
  { id: 'j4', startup: 'Verdant', title: 'Growth Lead', skills: ['B2B', 'Content', 'ABM'], location: 'Remote', equity: '0.3–0.8%', applicants: 17 },
];

export const CONVERSATIONS = [
  { id: 'c1', name: 'Marcus Wei', role: 'Mentor', last: 'Loved the deck — one note on slide 6.', unread: 2, time: '2m', avatar: PEOPLE[1].avatar },
  { id: 'c2', name: 'Elena Rossi', role: 'Investor', last: 'Let\'s do 30 mins next Tuesday?', unread: 0, time: '1h', avatar: PEOPLE[0].avatar },
  { id: 'c3', name: 'Jonas Berg', role: 'Team', last: 'Pushed the eval pipeline — 12% lift.', unread: 5, time: '3h', avatar: PEOPLE[3].avatar },
  { id: 'c4', name: 'Priya Shah', role: 'Founder', last: 'We should compare notes on OKRs.', unread: 0, time: '1d', avatar: PEOPLE[2].avatar },
];

export const MESSAGES = {
  c1: [
    { id: 'm1', from: 'them', body: 'Deck is looking sharp. Really tightened the wedge.', time: '10:12' },
    { id: 'm2', from: 'me', body: 'Thanks — reworked the ICP after our last call.', time: '10:14' },
    { id: 'm3', from: 'them', body: 'Loved the deck — one note on slide 6.', time: '10:22' },
  ],
  c2: [
    { id: 'm1', from: 'them', body: 'Saw the market insights — impressive traction.', time: '09:04' },
    { id: 'm2', from: 'them', body: "Let's do 30 mins next Tuesday?", time: '09:05' },
  ],
  c3: [
    { id: 'm1', from: 'them', body: 'Pushed the eval pipeline — 12% lift on the retrieval step.', time: '08:41' },
  ],
  c4: [
    { id: 'm1', from: 'them', body: 'We should compare notes on OKRs.', time: 'Yesterday' },
  ],
};

export const INSIGHTS = [
  { id: 'i1', title: 'Y Combinator opens Winter batch — deadline Feb 12', reason: 'Matches your stage (MVP) and industry (AI Commerce)', tag: 'Accelerator', time: '2h' },
  { id: 'i2', title: 'EU AI Act: what changes for agentic products in Q2', reason: 'Relevant to Aether Labs\' compliance posture', tag: 'Regulation', time: '6h' },
  { id: 'i3', title: 'Northlight Ventures publishes agentic-commerce thesis', reason: 'Elena Rossi (in your network) is the lead partner', tag: 'Investor', time: '1d' },
  { id: 'i4', title: 'Series-A checklists that actually work in 2026', reason: 'You marked "Funding" as your next milestone', tag: 'Playbook', time: '2d' },
  { id: 'i5', title: 'Hiring: ML engineers now open to fractional', reason: 'Aether Labs has an open Founding ML role', tag: 'Talent', time: '3d' },
];

export const MEETINGS = [
  { id: 'me1', with: 'Marcus Wei', role: 'Mentor', when: 'Tomorrow, 15:00', topic: 'Deck review — Series A prep' },
  { id: 'me2', with: 'Elena Rossi', role: 'Investor', when: 'Tuesday, 10:30', topic: 'Intro call' },
  { id: 'me3', with: 'Jonas Berg', role: 'Team', when: 'Fri, 09:00', topic: 'Sprint kickoff' },
];

export const NOTIFICATIONS = [
  { id: 'n1', type: 'mentor', text: 'Marcus Wei sent you a note on your deck.', time: '2m', unread: true },
  { id: 'n2', type: 'investor', text: 'Elena Rossi requested a meeting.', time: '1h', unread: true },
  { id: 'n3', type: 'ai', text: 'Your business plan v2 is ready.', time: '4h', unread: true },
  { id: 'n4', type: 'community', text: 'Priya Shah replied to your post.', time: '1d', unread: false },
];

export const VALIDATION_MOCK = {
  score: 82,
  swot: {
    strengths: ['Novel agentic architecture', 'Strong founder-market fit', 'Design-partner momentum'],
    weaknesses: ['Regulatory ambiguity in EU', 'Sales cycle length'],
    opportunities: ['Vertical expansion to fintech', 'Partnership with LLM providers'],
    threats: ['Big-tech native integrations', 'Model commoditization'],
  },
  risks: [
    { level: 'High', label: 'Compliance risk — EU AI Act Q2' },
    { level: 'Medium', label: 'Talent risk — ML market compression' },
    { level: 'Low', label: 'Distribution risk — dependent on 2 channels' },
  ],
  competitors: ['Rune AI', 'Merchant Copilot', 'Nova Checkout'],
  suggestions: [
    'Tighten ICP to mid-market brands doing >$50M GMV',
    'Publish a compliance-first agentic manifesto',
    'Convert 2 design partners into public case studies',
  ],
};

export const BUSINESS_PLAN_SECTIONS = [
  { title: 'Executive Summary', body: 'Nexora reimagines how founders turn ideas into companies — combining AI-native validation, planning, and network intelligence into a single operating layer for early-stage teams.' },
  { title: 'Problem', body: 'Early-stage founders stitch together 10+ tools to move from idea to launch. The result: slower cycles, weaker decisions, and lost momentum at the exact moment velocity matters most.' },
  { title: 'Solution', body: 'A unified platform: AI validation, business planning, roadmap generation, and warm access to mentors, investors, and talent — orchestrated by a founder-specific insights engine.' },
  { title: 'Market', body: 'TAM: $18B across founder productivity, mentorship, investor discovery, and startup ops. SAM: $4.2B in AI-native founder tooling. SOM (Year 3): $180M.' },
  { title: 'Traction', body: '12 design partners, 3 paying pilots, 42% MoM signup growth, NPS 71.' },
  { title: 'Business Model', body: 'Freemium → team subscription ($49/mo). Investor & mentor tiers billed annually. Revenue expansion via AI credits.' },
  { title: 'Team', body: 'Founders with prior venture-backed exits, senior ML/design/GTM leaders from Stripe, Figma, and Sequoia.' },
  { title: 'Ask', body: '$4.5M Seed to scale AI infrastructure and international GTM.' },
];

export const ROADMAP = [
  { quarter: 'Q1 2026', title: 'Design partners → paying pilots', milestones: ['Convert 6 pilots', 'Publish agentic manifesto', 'Ship v1 insights feed'] },
  { quarter: 'Q2 2026', title: 'Seed close & team ramp', milestones: ['Close $4.5M Seed', 'Hire founding ML + Design engineers', 'EU AI Act compliance framework'] },
  { quarter: 'Q3 2026', title: 'Public launch', milestones: ['Product Hunt launch', '10 case studies live', 'Marketplace beta'] },
  { quarter: 'Q4 2026', title: 'International expansion', milestones: ['UK + DACH GTM', 'Partnership tier live', 'Series A readiness'] },
];

export const PRICING = [
  { name: 'Explore', monthly: 0, yearly: 0, description: 'For founders shaping an idea.', features: ['AI Idea Validation (5/mo)', 'Community access', 'Basic market insights', 'Public profile'], cta: 'Start free' },
  { name: 'Build', monthly: 49, yearly: 39, description: 'For teams turning ideas into products.', features: ['Unlimited AI validation', 'AI Business Plan + Roadmap', 'Team Builder', 'Priority insights feed', 'Investor discovery'], cta: 'Start Build', highlighted: true },
  { name: 'Scale', monthly: 149, yearly: 119, description: 'For teams pursuing scale & funding.', features: ['Everything in Build', 'Mentor & investor concierge', 'Advanced analytics', 'SSO + audit logs', 'Priority support'], cta: 'Talk to sales' },
];

export const FAQ = [
  { q: 'How does Nexora\'s AI validation actually work?', a: 'You describe the idea in plain language. Our engine runs a structured scoring pass across market, wedge, timing, moat, and risk vectors — returning a numeric score plus a SWOT, competitor map, and prescriptive next steps.' },
  { q: 'Do I need to be a technical founder?', a: 'No. Nexora is designed for solo and non-technical founders as much as engineering-led teams. The AI operator layer removes the "cold start" problem.' },
  { q: 'How do investors and mentors get verified?', a: 'Every investor and mentor is reviewed via LinkedIn signal, references, and previous check history. Verified profiles carry a green badge.' },
  { q: 'Can I export my plan and roadmap?', a: 'Yes. Business plans export to PDF, roadmaps export to CSV or sync to Notion/Linear via our upcoming integrations.' },
  { q: 'Is Nexora free to try?', a: 'The Explore tier is free forever. Paid tiers start at $39/mo billed annually.' },
];

export const SUCCESS_STORIES = [
  { name: 'Aurorae', founder: 'Priya Shah', quote: 'Nexora replaced 6 tools and shaved a full quarter off our seed timeline.', metric: '$2.4M Seed in 9 weeks' },
  { name: 'Kilo Health', founder: 'Ravi Menon', quote: 'The mentor match alone was worth the annual plan. Marcus rebuilt our GTM in a week.', metric: '4.2x pipeline in 60 days' },
  { name: 'Loop Robotics', founder: 'Iris Chen', quote: 'The insights feed surfaced a grant we\'d never have found — it funded our entire prototype.', metric: '€600K non-dilutive' },
];

export const EVENTS = [
  { id: 'e1', title: 'Founders Studio — Berlin', date: 'Feb 20, 2026', type: 'In-person', hosts: 'Nexora + Northlight', attending: 214 },
  { id: 'e2', title: 'Agentic Commerce Roundtable', date: 'Feb 28, 2026', type: 'Virtual', hosts: 'Marcus Wei', attending: 88 },
  { id: 'e3', title: 'Climate Founders Pitch Night', date: 'Mar 6, 2026', type: 'In-person', hosts: 'Meridian Fund', attending: 132 },
  { id: 'e4', title: 'Series-A Readiness Bootcamp', date: 'Mar 14, 2026', type: 'Cohort', hosts: 'Yuki Tanaka', attending: 46 },
];
