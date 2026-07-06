```mermaid
graph LR
    User["User"]
    Startup["Startup"]
    Job["Job"]
    Chat["Chat"]
    Post["Post"]
    Idea["Idea"]
    Forum["Forum"]
    StartupMember["StartupMember"]
    Connection["Connection"]
    Follow["Follow"]
    Message["Message"]
    Application["Application"]
    InvestmentRequest["InvestmentRequest"]
    Comment["Comment"]
    Review["Review"]
    
    User -->|author| Post
    User -->|author| Idea
    User -->|author| Comment
    User -->|sender| Message
    User -->|reviewer| Review
    User -->|postedBy| Job
    User -->|applicant| Application
    
    Startup -->|startup| Post
    Startup -->|startup| Idea
    Startup -->|members| StartupMember
    Startup -->|investmentRequests| InvestmentRequest
    Startup -->|reviews| Review
    StartupMember -->|user| User
    StartupMember -->|startup| Startup
    
    Job -->|applications| Application
    Application -->|job| Job
    Application -->|applicant| User
    
    Chat -->|participants| User
    Chat -->|messages| Message
    Message -->|chat| Chat
    Message -->|sender| User
    
    Forum -->|replies| Forum
    Forum -->|author| User
    
    Post -->|comments| Comment
    Comment -->|author| User
    
    Connection -->|fromUser| User
    Connection -->|toUser| User
    
    Follow -->|follower| User
    Follow -->|target| User
    
    style User fill:#64B5F6
    style Startup fill:#81C784
    style Job fill:#FFB74D
    style Chat fill:#F06292
    style Post fill:#BA68C8
    style Connection fill:#4DD0E1
    style Follow fill:#4DD0E1
```
