# Nexora Database Diagrams Guide

## 📊 Diagrams Overview

### 1. **LogicalDataModel.png**
**Purpose**: Show the overall data structure and collections

**Should Include**:
- All 30 MongoDB collections
- Fields for each collection (simplified view)
- Data types
- Required vs optional fields
- Primary keys/unique fields

**Collections**:
```
Core Entities:
├── User (name, email, role, bio, location, createdAt)
├── Startup (name, tagline, description, stage, industry, foundedDate)
├── Idea (title, description, status, category)
├── MarketInsight (title, summary, category, source)
└── StartupCategory (name, description, slug)

Social Features:
├── Post (content, visibility, imageUrl)
├── Comment (content, rating)
├── Like (targetType)
├── Follow (follower, target)
└── Connection (fromUser, toUser, status)

Team & Membership:
├── StartupMember (role: founder/cofounder/member/advisor)
├── MentorAssignment (mentor, mentee, startup)
└── Meeting (title, description, participants, date)

Communication:
├── Chat (participants, type: direct/group)
├── Message (content, sender, readAt)
├── Notification (type, message, isRead)
└── Forum & ForumReply (threaded discussions)

Jobs & Applications:
├── Job (title, description, location, type, postedBy)
└── Application (job, applicant, status, coverLetter)

Finance & Investment:
├── InvestmentRequest (amount, currency, status)
├── Milestone (title, description, targetDate, progress)
└── Progress (completion percentage)

Content & Documents:
├── Document (title, content, type)
├── Feedback (rating, comment, type)
└── Review (startup, reviewer, rating, comment)

AI Features:
├── AIReport (startup, title, summary)
├── AIRecommendation (user, type, targetId, reason)
└── SavedInsight (user, insight, savedAt)

User Preferences:
└── UserPreference (interests, preferredCategories, notifications)
```

---

### 2. **CollectionRelationship.png**
**Purpose**: Show 1-to-many and many-to-many relationships

**Should Include**:
```
User → Many Relationships:
  ├── Posts (1 User : Many Posts)
  ├── Ideas (1 User : Many Ideas)
  ├── Comments (1 User : Many Comments)
  ├── Messages (1 User : Many Messages)
  ├── Reviews (1 User : Many Reviews)
  ├── Jobs Posted (1 User : Many Jobs)
  ├── Applications (1 User : Many Applications)
  ├── Meetings (Many Users : Many Meetings)
  ├── Connections (Many Users : Many Connections)
  ├── Following (1 User : Many Follows)
  ├── Followers (Many Users : 1 User)
  └── AIRecommendations (1 User : Many Recommendations)

Startup → Many Relationships:
  ├── Members (1 Startup : Many StartupMembers)
  ├── Ideas (1 Startup : Many Ideas)
  ├── Posts (1 Startup : Many Posts)
  ├── Reviews (1 Startup : Many Reviews)
  ├── InvestmentRequests (1 Startup : Many Requests)
  ├── Milestones (1 Startup : Many Milestones)
  ├── AIReports (1 Startup : Many Reports)
  └── SavedInsights (Many Users : 1 Startup)

Job → Many Relationships:
  ├── Applications (1 Job : Many Applications)
  └── ApplicantPool (Many Users : 1 Job)

Chat → Many Relationships:
  ├── Messages (1 Chat : Many Messages)
  └── Participants (Many Users : 1 Chat)

Forum → Many Relationships:
  └── Replies (1 Forum : Many ForumReplies)

Category → Relationships:
  ├── Startups (1 Category : Many Startups)
  └── UserPreferences (Many Users : Many Categories)
```

---

### 3. **MongoDBArchitecture.png**
**Purpose**: Show deployment, indexing, and architecture design

**Should Include**:

```
Atlas Cluster Architecture:
┌─────────────────────────────────────────┐
│      MongoDB Atlas (nexora database)     │
├─────────────────────────────────────────┤
│  Replica Set: 3 Nodes (M30+ tier)       │
│  ├── Primary Node                       │
│  ├── Secondary Node 1                   │
│  └── Secondary Node 2                   │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│    Collections (30 total)                │
├─────────────────────────────────────────┤
│  Core Collections (Indexed):             │
│  ├── users (email, role)                │
│  ├── startups (name, stage, industry)   │
│  ├── ideas (status, category)           │
│  └── marketInsights (category, tags)    │
│                                          │
│  Relationship Collections:               │
│  ├── connections (fromUser, toUser)     │
│  ├── follows (follower, target)         │
│  └── startupMembers (startup, user)     │
│                                          │
│  Social/Engagement:                      │
│  ├── posts (author, startup)            │
│  ├── comments (author, post)            │
│  ├── likes (userId, targetId)           │
│  └── reviews (startup, reviewer)        │
│                                          │
│  Communication:                          │
│  ├── chats (participants)               │
│  ├── messages (chat, sender)            │
│  ├── notifications (recipient)          │
│  └── forums & forumReplies              │
│                                          │
│  Business:                               │
│  ├── jobs (postedBy, isActive)          │
│  ├── applications (job, applicant)      │
│  └── investmentRequests (startup)       │
│                                          │
│  AI & Intelligence:                      │
│  ├── aiReports (startup)                │
│  ├── aiRecommendations (user)           │
│  └── savedInsights (user)               │
│                                          │
│  Other:                                  │
│  ├── documents, feedback, progress      │
│  ├── meetings, milestones               │
│  ├── mentorAssignments                  │
│  └── userPreferences                    │
└─────────────────────────────────────────┘

Key Indexes:
  • users: {email: 1 (unique)}, {role: 1}
  • startups: {name: 1}, {stage: 1}, {industry: 1}
  • posts: {author: 1}, {startup: 1}, {createdAt: -1}
  • messages: {chat: 1}, {sender: 1}, {createdAt: -1}
  • connections: {fromUser: 1, toUser: 1}, {status: 1}
  • jobs: {postedBy: 1}, {isActive: 1}, {createdAt: -1}
```

---

### 4. **ERDiagram.png** (Entity Relationship Diagram)
**Purpose**: Visual representation of entity relationships (like SQL ER diagram)

**Should Show**:
```
Entity Types:
  ┌─────────────┐
  │   Person    │  (User, Mentor)
  └─────────────┘
       │
       ├─ 1:N ─→ Post
       ├─ 1:N ─→ Idea
       ├─ 1:N ─→ Review
       ├─ M:M ─→ Chat (Participants)
       ├─ M:M ─→ Meeting (Attendees)
       └─ 1:1 ─→ UserPreference

  ┌─────────────┐
  │  Startup    │
  └─────────────┘
       │
       ├─ 1:N ─→ StartupMember (Team)
       ├─ 1:N ─→ Post
       ├─ 1:N ─→ Idea
       ├─ 1:N ─→ InvestmentRequest
       ├─ 1:N ─→ AIReport
       ├─ 1:N ─→ Review
       ├─ N:1 ← StartupCategory
       └─ 1:N ─→ Milestone

  ┌─────────────┐
  │   Job       │
  └─────────────┘
       │
       ├─ N:1 ← User (Posted By)
       └─ 1:N ─→ Application (Applicants)

  ┌─────────────┐
  │   Chat      │
  └─────────────┘
       │
       ├─ M:N ─→ User (Participants)
       └─ 1:N ─→ Message

  ┌─────────────┐
  │   Forum     │
  └─────────────┘
       │
       ├─ N:1 ← User (Author)
       └─ 1:N ─→ ForumReply

  ┌──────────────────────┐
  │  Social Interactions │
  ├──────────────────────┤
  │  - Connection        │ (Pending/Accepted)
  │  - Follow            │ (Unidirectional)
  │  - Like              │ (Polymorphic: Post/Comment)
  │  - Comment           │ (On Posts/Forums)
  └──────────────────────┘

Key Relationships:
  • User ──1:N──→ Post (Author)
  • User ──1:N──→ Idea (Author)
  • User ──N:M──→ Chat (Participants)
  • Startup ──1:N──→ StartupMember (Team)
  • Job ──1:N──→ Application (Applicants)
  • User ──1:N──→ Message (Sender)
```

---

## 📐 Suggested Tools to Create Diagrams

### Option 1: **Draw.io** (Recommended)
- Free, web-based
- Export as PNG
- Easy to create entity relationships

### Option 2: **Lucidchart**
- Professional diagrams
- Real-time collaboration

### Option 3: **Mermaid** (Code-based)
Create mermaid diagrams in markdown files

### Option 4: **MongoDB Compass**
- Visual schema browser
- Auto-generate from live database

---

## 🎯 Action Items

Create these 4 diagram files:
1. ✏️ **LogicalDataModel.png** - Collection structure overview
2. ✏️ **CollectionRelationship.png** - Foreign key relationships
3. ✏️ **MongoDBArchitecture.png** - Deployment & indexing strategy
4. ✏️ **ERDiagram.png** - Entity-relationship visual

Each diagram should include a legend and be 1200x800px minimum for clarity.
