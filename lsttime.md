create whole app with working everying and lanfing pagle already created

<https://github.com/Lightrex7749/NexoraV2.0>
main branch, just match the theam and create full app without databse , i will intregate databse later just make full app

Welcome to Emergent—your launchpad for ambitious apps.

This is solid—you've got a theme, a clear vision, and you're ready to ship something real. Building on Emergent means you'll have a full working app from day one, architectured so database integration slots in seamlessly when you're ready. That's production-grade, not a prototype.

I'll set up your core structure now and we'll iterate from there. Let's build.

P.S. You retain full ownership of your idea, content, and any IP in the application you build. Emergent is here to help you build, launch, and manage it.
App scope — What is Nexora? (I'll fetch the landing page and brief docs, but please confirm briefly)

Something else

Which pages/screens should be built? (in addition to the existing landing page)

All screens from the architecture doc you uploaded

Auth — since you said "no database yet":

Skip auth entirely

Data — for lists/tables/charts, should I:

Use realistic mock/dummy data

AI features — does Nexora need any LLM/AI integration now (chat, generation, etc.)?

Yes, wire mock responses only

Now I understand the scope. The GitHub repo has:

A minimal backend (server.py with newsletter/contact endpoints)
An empty frontend folder (nothing was committed)
Complete design_guidelines.json — premium dark, Clash Display + Satoshi, emerald→amber accents, glassmorphism, GSAP + Lenis, magnetic buttons, custom cursor, etc.

I'll build the full Nexora app (landing + all dashboards + all screens) matching this theme with mock data. Let me set up the environment first.

Now let me set up the frontend. I'll create the full React app in one batch.

Now the core React app files, styles, mock data and utilities.

Now the mock data, shared components (cursor, magnetic button, glass card, etc.), and the App with routing:

Now the shared components (Cursor, MagneticButton, Grain, GlassCard, Navbar, Footer, Sidebar) and the App with routing.

Now the App Shell (sidebar for the authenticated screens) and the App router:

Now the crown-jewel Landing page + all public pages. I'll create them in parallel batches:

Now the app pages (dashboard, startups, network, community, chat, team, insights, AI suite, mentor, investor, admin, profile, settings, notifications):

Now the remaining app pages (Mentor, Investor, Admin, Profile, Settings, Notifications):


