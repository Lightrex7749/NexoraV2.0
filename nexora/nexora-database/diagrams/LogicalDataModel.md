```mermaid
graph TB
    subgraph Core["Core Entities"]
        User["👤 User<br/>email, name, role<br/>bio, location"]
        Startup["🚀 Startup<br/>name, description<br/>stage, industry"]
        Idea["💡 Idea<br/>title, description<br/>status, category"]
        MarketInsight["📊 MarketInsight<br/>title, summary<br/>category, tags"]
        Category["📁 StartupCategory<br/>name, slug"]
    end

    subgraph Social["Social Features"]
        Post["📝 Post<br/>content, visibility"]
        Comment["💬 Comment<br/>content, rating"]
        Like["❤️ Like<br/>targetType"]
        Follow["👁️ Follow<br/>follower→target"]
        Connection["🤝 Connection<br/>status: pending/accepted"]
    end

    subgraph Team["Team & Organization"]
        Member["👥 StartupMember<br/>role, joinedAt"]
        Mentor["🎓 MentorAssignment<br/>mentor, mentee"]
        Meeting["📅 Meeting<br/>title, date"]
    end

    subgraph Communication["Communication"]
        Chat["💬 Chat<br/>participants, type"]
        Message["✉️ Message<br/>content, readAt"]
        Notification["🔔 Notification<br/>type, message"]
        Forum["🗣️ Forum<br/>title, description"]
        ForumReply["↪️ ForumReply<br/>content, rating"]
    end

    subgraph Business["Business"]
        Job["💼 Job<br/>title, description<br/>location, type"]
        Application["📄 Application<br/>status, coverLetter"]
        Investment["💰 InvestmentRequest<br/>amount, currency"]
        Milestone["🎯 Milestone<br/>title, targetDate"]
    end

    subgraph Content["Content & Feedback"]
        Document["📄 Document<br/>title, content"]
        Feedback["⭐ Feedback<br/>rating, comment"]
        Review["⭐ Review<br/>rating, comment"]
    end

    subgraph AI["AI Features"]
        AIReport["🤖 AIReport<br/>title, summary"]
        AIRec["🧠 AIRecommendation<br/>type, reason"]
        SavedInsight["📌 SavedInsight<br/>insight, savedAt"]
    end

    subgraph Preferences["User Preferences"]
        UserPref["⚙️ UserPreference<br/>interests, categories<br/>notifications"]
    end

    %% Core Relationships
    User -->|1:N| Post
    User -->|1:N| Idea
    User -->|1:N| Comment
    User -->|1:N| Message
    User -->|1:N| Review
    User -->|1:N| Job
    User -->|1:N| Application
    User -->|M:M| Chat
    User -->|M:M| Meeting
    User -->|1:1| UserPref
    
    Startup -->|1:N| Post
    Startup -->|1:N| Idea
    Startup -->|1:N| Member
    Startup -->|1:N| Investment
    Startup -->|1:N| Milestone
    Startup -->|1:N| Review
    Startup -->|N:1| Category
    Startup -->|1:N| AIReport
    
    Job -->|1:N| Application
    Chat -->|1:N| Message
    Forum -->|1:N| ForumReply
    Category -->|1:N| Startup
    
    User -->|1:N| AIRec
    User -->|1:N| SavedInsight
    Startup -->|1:N| SavedInsight

    style Core fill:#e1f5ff
    style Social fill:#f3e5f5
    style Team fill:#fff3e0
    style Communication fill:#fce4ec
    style Business fill:#e8f5e9
    style Content fill:#f1f8e9
    style AI fill:#ede7f6
    style Preferences fill:#f0f4c3
```
