# Nexora – AI Powered Startup Incubation Management Platform

![Nexora Platform](https://img.shields.io/badge/Platform-Nexora-blue.svg)
![Stack](https://img.shields.io/badge/Stack-MERN-green.svg)
![License](https://img.shields.io/badge/License-MIT-purple.svg)

Nexora is a centralized web-based platform that assists entrepreneurs throughout their complete startup lifecycle, from idea validation to business growth. It eliminates the need to use multiple fragmented platforms by integrating startup management, mentorship, investment opportunities, networking, and Artificial Intelligence into a single application.

## 🚀 Features

### 1. Role-Based Architecture
- **Founders**: Create startup profiles, submit business ideas, track progress, and communicate with mentors/investors.
- **Mentors**: Review assigned startups, provide guidance, and schedule meetings via the dedicated Mentor Studio.
- **Investors**: Explore startup profiles, evaluate business proposals, and submit investment requests through the Investor Desk.
- **Team Members**: Collaborate on startup activities.
- **Administrators**: Manage users, monitor startup activities, approve registrations, and maintain platform security.

### 2. Startup Management
- Create comprehensive startup profiles and submit innovative ideas.
- Upload essential business documents such as pitch decks and business plans.
- Monitor progress and manage milestones effectively.

### 3. Networking & Community
- Connect with other entrepreneurs, mentors, and investors.
- Participate in discussion forums.
- Real-time chat functionality for seamless communication.

### 4. AI-Powered Services
- **Idea Validation**: AI-driven analysis of your startup ideas.
- **Market Insights**: AI-generated personalized market trends and funding opportunities.
- **Recommendations**: Intelligent suggestions tailored for startup growth.

## 🛠️ Technology Stack (MERN)

- **Frontend**: React.js, HTML5, CSS3, JavaScript (ES6), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Version Control**: Git & GitHub

## 📂 Project Structure

```
nexora2.3/
├── app/
│   ├── frontend/         # React.js application
│   │   ├── src/          # React components, pages, context, styles
│   │   └── public/       # Static assets
│   └── backend/          # Node.js + Express.js API
│       ├── config/       # Database configuration
│       ├── controllers/  # API business logic
│       ├── models/       # Mongoose database models
│       ├── routes/       # API endpoints definition
│       ├── services/     # AI integration and other services
│       ├── database-docs/# Database diagrams and setup guides
│       ├── sample-data/  # JSON data for seeding
│       └── server.js     # Entry point for backend
├── Nexora_Master_Architecture.md # Detailed architecture specifications
└── README.md             # This file
```

## ⚙️ Setup and Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nexora2.3
   ```

2. **Setup Environment Variables**
   - In `app/backend`, copy `.env.example` to `.env` and fill in your MongoDB URI, JWT Secret, and AI API Key.
   - In `app/frontend`, copy `.env.example` to `.env` if custom URLs are needed.

3. **Install Dependencies**
   From the project root, run:
   ```bash
   npm run install:all
   ```

4. **Run the Application**
   You can start both the frontend and backend concurrently from the root directory:
   ```bash
   npm run dev
   ```

5. **Database Seeding (Optional)**
   You can populate the database with initial sample data provided in the `app/backend/seed` folder.

## 📄 Documentation & Diagrams
Additional documentation, ER diagrams, and MongoDB setup instructions have been preserved in `app/backend/database-docs`. Detailed system architecture can be found in `Nexora_Master_Architecture.md`.

## 🤝 Contributing
Contributions are welcome! Please fork the repository, create a new feature branch, and submit a pull request.

## 🛡️ License
This project is licensed under the MIT License.
