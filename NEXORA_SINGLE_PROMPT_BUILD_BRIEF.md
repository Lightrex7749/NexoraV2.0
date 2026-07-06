# 🚀 NEXORA — SINGLE-PROMPT FULL APPLICATION BUILD BRIEF

> **How to use this file:** Paste this entire document as one prompt into your AI coding agent (Claude Code, Cursor, etc.). It is self-contained — the agent should NOT need to ask clarifying questions to begin. The agent must plan first, then build in phases, committing progress as it goes.

---

## 0. ROLE

You are acting as a Senior Full-Stack Engineering Team: Software Architect, Full-Stack Developer (MERN), Motion/Creative Developer, UI/UX Designer, and Technical Writer — all in one. You will design AND build the complete, production-grade web application **Nexora** end-to-end.

---

## 1. PROJECT IDENTITY

- **Name:** Nexora
- **Tagline:** "From Idea to Impact."
- **What it is:** An AI-powered startup ecosystem that takes a founder from raw idea → AI validation → business plan → team building → networking → incubation → mentorship → investor matching → funding → growth, all inside one platform.
- **Users:** Founder, Mentor, Investor, Team Member, Admin (a single account can hold multiple roles).

---

## 2. FIRST STEP — YOU MUST PLAN BEFORE YOU CODE

Before writing any application code, generate the following markdown planning artifacts inside a `/docs` folder. Do not skip this step — it is part of the deliverable, not busywork:

1. **`docs/PROJECT_PLAN.md`** — your own restatement of scope, assumptions you're making, and a phase-by-phase execution plan with checkboxes.
2. **`docs/ARCHITECTURE.md`** — system architecture diagram (mermaid), folder structure, module boundaries, data flow.
3. **`docs/DATABASE_SCHEMA.md`** — every MongoDB collection, its fields, indexes, and embed-vs-reference rationale.
4. **`docs/API_REFERENCE.md`** — every REST endpoint and WebSocket event, request/response shape.
5. **`docs/DESIGN_SYSTEM.md`** — color tokens, type scale, spacing scale, motion/easing tokens, component inventory.
6. **`docs/TASKS.md`** — a running checklist you update as you complete each phase (this is your own todo tracker across the whole build — check items off as you go so progress is visible).

After producing these, proceed to build. Update `docs/TASKS.md` after every phase.

---

## 3. THE LANDING PAGE — NON-NEGOTIABLE "WOW" MANDATE

This is the single most important surface in the entire build. It must **not** look like a templated AI-generated SaaS landing page (no generic centered hero + 3 icon-cards + testimonials-in-a-row layout, no default Tailwind-UI-look, no stock gradient blob backgrounds). It must feel like a **premium, award-worthy, motion-driven digital experience** — the kind that would be shortlisted on Awwwards or FWA.

### 3.1 Reference feel (study the *craft*, not the literal design — do not copy any brand's actual layout, logo, copy, or assets)
Draw inspiration from the *interaction language and production quality* of sites like: **animejs.com** (playful, precise micro-interactions), **hivetown.co** (bold typography + confident whitespace), **davidwhyte.com/experience** (editorial scroll storytelling), **igloo.inc** (glossy, tactile, almost physical UI), **lenis.dev** and **gsap.com** (buttery smooth scroll-driven motion as the core identity, not decoration).

### 3.2 Required techniques (implement all of these)
- **Lenis** for global buttery smooth scrolling (replace native scroll behavior site-wide).
- **GSAP + ScrollTrigger** for all scroll-driven animation: pinned sections, scrubbed timelines, staggered reveals.
- **Split-text reveal animations** on hero and section headlines (character/word-level stagger on scroll into view).
- **Magnetic cursor buttons** — CTA buttons subtly pull toward the cursor on hover; custom cursor (dot + ring) that morphs on interactive elements.
- **Glassmorphism / glossy surfaces** — frosted-glass cards with subtle specular highlight, soft inner shadows, and a fine grain/noise texture overlay across the page for a premium, non-flat feel.
- **Gradient-mesh / animated aurora background** in the hero, subtly shifting, not distracting.
- **Horizontal-scroll or pinned "story" section** — e.g., the "Idea → Validation → MVP → Launch → Growth → Funding" journey rendered as a pinned horizontal timeline that scrubs with vertical scroll.
- **Parallax depth layers** (background/midground/foreground moving at different scroll speeds).
- **Marquee/infinite-scroll strip** for logos, stats, or feature tags.
- **Page-load intro animation** (brief, skippable, sets tone — e.g., logo mark assembling or a wordmark reveal) that only plays once per session.
- **Scroll-based navbar behavior** — shrinks/blurs on scroll, hides on scroll-down/reveals on scroll-up.
- **Micro-interactions everywhere**: buttons, cards, and links get purposeful hover/press states (scale, glow, shadow-shift) — nothing static.
- **View Transitions / smooth route transitions** between landing and app sections (fade + slight scale, no hard cuts).
- Respect `prefers-reduced-motion` — provide a reduced-motion fallback path that keeps content accessible with instant/simple transitions.

### 3.3 Visual theme
- **Premium dark-mode-first** aesthetic: deep charcoal/near-black base (`#0A0A0C`–`#111114`), NOT default `#000`. Accent: a refined duotone gradient (e.g., electric indigo → warm amber, or emerald → gold) used sparingly for emphasis, not everywhere.
- **Typography:** one confident display/variable font for headlines (large, tight tracking, high contrast weight), one clean grotesk/sans for body. Avoid default system fonts and avoid generic "Inter everywhere" look — pick something with more character (e.g., a display serif or geometric sans pairing) and justify the choice in `DESIGN_SYSTEM.md`.
- **Glossy material language:** subtle specular highlights on cards/buttons (a soft diagonal light sweep on hover), fine grain texture, soft glow on interactive elements — think "physical, tactile glass" rather than flat material-design cards.
- **Generous whitespace and large type scale** — editorial confidence over cramped SaaS density.
- **No emoji, no default browser alert()/confirm(), no default focus-outline removal without a visible custom focus state (accessibility).**

### 3.4 Landing page sections required
1. Intro/load animation → Hero (split-text headline + magnetic CTA + subtle animated gradient mesh)
2. Marquee strip (trust signals / "built for founders, mentors, investors")
3. Pinned horizontal "Idea → Impact" journey timeline (scroll-scrubbed)
4. Feature showcase — alternating glossy cards revealing on scroll (Idea Validation, Business Plan AI, Team Builder, Mentorship, Investor Matching, Market Insights)
5. "How it works" editorial scroll story (David-Whyte-style narrative pacing)
6. Startup Showcase carousel (draggable/momentum-based)
7. Testimonials / Success Stories (glossy card stack or horizontal drag)
8. Pricing (optional toggle monthly/yearly with smooth number-morph animation)
9. FAQ (accordion with smooth height animation)
10. Final CTA (full-bleed gradient section, magnetic button)
11. Footer with subtle parallax and marquee of partner/industry tags

---

## 4. FULL TECH STACK (mandatory)

**Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + React Router + TanStack Query + GSAP (+ ScrollTrigger, SplitText via GSAP club plugin or a text-splitting alternative if unavailable) + Lenis + Framer Motion (for smaller UI transitions where GSAP is overkill) + Zustand (light global state)

**Backend:** Node.js + Express.js + Mongoose + **MongoDB** (schema-flexible, use JSON Schema validators + Mongoose validation) + Redis (cache, sessions, BullMQ queues) + Socket.io (realtime chat/notifications/AI job progress) + BullMQ (async AI job processing)

**Auth:** JWT (access + rotating refresh tokens) + Google OAuth

**Storage:** AWS S3 or Cloudinary (pitch decks, documents, avatars)

**AI:** OpenAI or Gemini API, called only from async BullMQ workers, never blocking the request thread

**Infra:** Docker + docker-compose (local: mongo + redis), GitHub Actions CI (lint → typecheck → test → build)

---

## 5. FULL FEATURE SCOPE (build all of this — this is the whole app, not just the landing page)

1. **Auth** — register/login, Google OAuth, JWT + refresh rotation, email verification, forgot/reset password, RBAC (5 roles, multi-role capable accounts)
2. **Startup Management** — create/edit startup, pitch deck & document upload, status/timeline, admin approve/reject, admin assign mentor
3. **Networking** — search people, connect, follow, profiles, skills/interests/industry tags
4. **Community** — posts, comments, upvotes, categories, trending
5. **Realtime Chat** — Founder↔Mentor, Founder↔Investor, Founder↔Team, typing indicators, read receipts
6. **Team Builder** — job postings, applications, AI-based co-founder/team matching by skill vector similarity
7. **Mentor Module** — dashboard, assigned startups, meetings, notes, feedback
8. **Investor Module** — browse/filter startups, save, express interest, request meetings, pipeline (Watching→Interested→Meeting→Invested/Passed)
9. **AI Idea Validation** — async job → score, SWOT, market potential, competitors, risks, suggestions
10. **AI Business Plan Generator** — async job → full plan sections, export to PDF, versioned
11. **AI Roadmap Planner** — milestone/timeline generator with task list
12. **AI Recommendation Engine** — mentors/investors/co-founders/events/resources
13. **AI Market Insights Feed** — personalized per founder (industry, stage, location, interests, activity), each item includes an AI-generated "why you're seeing this" summary
14. **Notifications** — in-app + email, all key lifecycle events
15. **Public Website** — the premium landing page described in Section 3, plus About, Features, Pricing, Showcase, Events, Success Stories, Contact, FAQ
16. **Admin Panel** — approvals queue, user management, mentor assignment, moderation, analytics dashboard, audit log

---

## 6. DATABASE (MongoDB) — DESIGN RULES

- Use Mongoose with `_id: ObjectId` defaults.
- Soft delete via `deletedAt` + a reusable Mongoose `pre(/^find/)` plugin applied to all soft-deletable schemas.
- Embed small, bounded, always-together-fetched data (e.g., SWOT results, roadmap milestones). Reference unbounded/high-growth collections (messages, comments, notifications, audit logs) — never embed unbounded arrays.
- Enum validators for closed-set fields (`stage`, `status`, `role`, `jobType`).
- Explicit compound indexes for hot paths: startup filters (`industry`, `stage`, `status`), chat pagination (`conversationId`, `createdAt`), notifications (`userId`, `readAt`), community trending (`category`, `createdAt`/vote score).
- Multi-document transactions (replica set) for operations that must be atomic across collections (e.g., create Startup + initial StartupMember).
- Collections: `users`, `startups`, `startupMembers`, `startupDocuments`, `mentorAssignments`, `connections`, `follows`, `posts`, `comments`, `votes`, `conversations`, `messages`, `jobPostings`, `jobApplications`, `investorInterests`, `aiJobs`, `validationResults`, `businessPlans`, `roadmaps`, `notifications`, `events`, `auditLogs`.

---

## 7. FOLDER STRUCTURE (monorepo)

```
nexora/
├── apps/
│   ├── web/                 # React + Vite + TS + Tailwind + GSAP + Lenis
│   │   └── src/
│   │       ├── app/          # router, providers, layout shells
│   │       ├── pages/
│   │       ├── features/     # feature-sliced (auth, startups, ai, chat, landing, ...)
│   │       ├── components/ui # design-system primitives
│   │       ├── lib/           # axios, queryClient, socket.ts, lenis.ts, gsap setup
│   │       ├── animations/    # reusable GSAP timelines/hooks (useScrollReveal, useMagnetic, useSplitText)
│   │       └── styles/
│   └── api/                  # Node + Express + Mongoose
│       └── src/
│           ├── modules/       # auth, users, startups, networking, community, chat,
│           │                  # team-builder, mentorship, investors, ai/*, notifications, admin
│           ├── middlewares/
│           ├── jobs/           # BullMQ queues/workers
│           ├── sockets/
│           ├── db/models/      # Mongoose schemas
│           ├── db/migrations/  # migrate-mongo (index/validator/backfill changes)
│           └── server.ts
├── packages/
│   ├── shared-types/
│   ├── shared-schemas/         # Zod, shared client+server validation
│   └── config/
├── docs/                        # planning artifacts from Section 2
├── docker/
└── README.md
```

---

## 8. BUILD PHASES (execute in order, update `docs/TASKS.md` after each)

- **Phase 0 — Planning & Scaffolding:** produce all docs from Section 2; scaffold monorepo, Docker compose (mongo+redis), CI pipeline, design tokens.
- **Phase 1 — Design System & Landing Page:** build the full component library and ship the complete premium landing page from Section 3 with all motion effects working smoothly at 60fps, reduced-motion fallback included.
- **Phase 2 — Auth & Core Data Layer:** JWT+OAuth auth, user model/roles, RBAC middleware, base API scaffolding for all modules.
- **Phase 3 — Startup, Networking, Community:** CRUD + feeds + search.
- **Phase 4 — Realtime & Team Builder:** Socket.io chat, job postings/applications, matching logic.
- **Phase 5 — Mentor & Investor Modules:** dashboards, assignment, pipeline.
- **Phase 6 — AI Suite:** BullMQ job pipeline + all 5 AI features wired end-to-end with real async UX (loading → progress → result).
- **Phase 7 — Notifications, Admin Panel, Polish, Hardening:** notification triggers, admin analytics/moderation, accessibility pass, performance pass (Lighthouse ≥ 90 on landing page), security review, deploy.

---

## 9. DEFINITION OF DONE

- Landing page scores ≥ 90 on Lighthouse Performance and Accessibility, animations run at 60fps, and reduced-motion users get a fully usable fallback.
- Every module in Section 5 has working CRUD/flows end-to-end, not just UI mockups — real MongoDB persistence, real API calls.
- Auth, RBAC, and ownership checks are enforced on every mutating endpoint.
- AI features run through the async job queue and update the UI via WebSocket, never blocking a request.
- All docs from Section 2 exist, are accurate, and are kept in sync with the code.
- `README.md` at the root explains setup (`docker-compose up`, env vars, seed, dev script) well enough that a new developer can run the full app in under 10 minutes.

---

## 10. THINGS TO EXPLICITLY AVOID

- Generic templated SaaS landing page look (centered hero, 3 icon cards, plain testimonial row, default blue/purple SaaS gradient).
- Static, motionless sections — every section on the landing page must have at least one intentional scroll or hover-driven animation.
- Blocking the Express request thread with direct AI provider calls.
- Storing secrets in code or client bundle.
- Skipping the planning docs in Section 2 — they must exist before feature code is written.

---

*End of brief. Begin with Section 2 (planning artifacts), then proceed through the Build Phases in Section 8 in order.*
