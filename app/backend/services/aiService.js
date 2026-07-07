import Groq from "groq-sdk";

let groqAI = null;

const getGroqAI = () => {
  if (!groqAI) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not set or invalid in environment variables");
    }
    groqAI = new Groq({ apiKey });
  }
  return groqAI;
};

// Kept the same function name to avoid breaking the controllers
export const callGeminiAPI = async (systemPrompt, userPromptOrMessages, jsonMode = true, hideError = false) => {
  try {
    const ai = getGroqAI();
    
    let messages = [{ role: "system", content: systemPrompt }];
    if (Array.isArray(userPromptOrMessages)) {
      messages = messages.concat(userPromptOrMessages);
    } else {
      messages.push({ role: "user", content: userPromptOrMessages });
    }

    // Groq requires strictly alternating roles. Filter out consecutive identical roles by keeping the latest.
    const sanitizedMessages = [];
    for (const m of messages) {
      if (sanitizedMessages.length > 0 && sanitizedMessages[sanitizedMessages.length - 1].role === m.role) {
        sanitizedMessages[sanitizedMessages.length - 1].content += "\n\n" + m.content;
      } else {
        sanitizedMessages.push({ ...m });
      }
    }

    const chatCompletion = await ai.chat.completions.create({
      messages: sanitizedMessages,
      model: "llama-3.3-70b-versatile",
      response_format: jsonMode ? { type: "json_object" } : { type: "text" }
    });

    const text = chatCompletion.choices[0]?.message?.content || "";
    return jsonMode ? JSON.parse(text) : text;
  } catch (error) {
    if (!hideError) {
      console.error("Groq API Error:", error);
    }
    throw error;
  }
};

export const validateIdea = async (ideaText) => {
  const systemPrompt = `You are an expert startup advisor. Evaluate the following startup idea and return a JSON object with this exact structure:
{
  "score": <number 0-100>,
  "swot": {
    "Strengths": ["...", "..."],
    "Weaknesses": ["...", "..."],
    "Opportunities": ["...", "..."],
    "Threats": ["...", "..."]
  },
  "risks": [
    { "level": "High" | "Medium" | "Low", "label": "..." }
  ],
  "suggestions": ["...", "..."]
}`;
  
  const res = await callGeminiAPI(systemPrompt, `Startup Idea: ${ideaText}`);
  return res;
};

export const generatePlan = async (ideaText) => {
  const systemPrompt = `You are a business planning expert. Create a 4-section business plan for this startup idea. Return ONLY a JSON object with this structure:
{
  "plan": [
    { "title": "Executive Summary", "content": "..." },
    { "title": "Market Analysis", "content": "..." },
    { "title": "Go-to-Market Strategy", "content": "..." },
    { "title": "Financial Projections", "content": "..." }
  ]
}`;
  
  const res = await callGeminiAPI(systemPrompt, `Startup Idea: ${ideaText}`);
  return res.plan || res;
};

export const generateRoadmap = async (ideaText) => {
  const systemPrompt = `You are an experienced product manager. Create a 4-quarter roadmap for this startup. Return ONLY a JSON object with this structure:
{
  "roadmap": [
    { "phase": "Q1 2026", "title": "...", "items": ["...", "..."] },
    { "phase": "Q2 2026", "title": "...", "items": ["...", "..."] },
    { "phase": "Q3 2026", "title": "...", "items": ["...", "..."] },
    { "phase": "Q4 2026", "title": "...", "items": ["...", "..."] }
  ]
}`;
  
  const res = await callGeminiAPI(systemPrompt, `Startup Idea: ${ideaText}`);
  return res.roadmap || res;
};

export const chatWithAI = async (message, fileData, history = []) => {
  let userPrompt = message;
  if (fileData) {
    userPrompt += `\n[Attached File: ${fileData.filename}]`;
  }
  
  const systemPrompt = "You are Nexora AI, a helpful startup assistant. Provide concise and actionable advice.";
  
  // Convert frontend history to Groq roles
  const messages = history.map(msg => ({
    role: msg.role === 'ai' ? 'assistant' : 'user',
    content: msg.content + (msg.file ? `\n[Attached File: ${msg.file}]` : '')
  }));
  
  messages.push({ role: 'user', content: userPrompt });
  
  const reply = await callGeminiAPI(systemPrompt, messages, false);
  return { reply };
};

export const generateHashtags = async (title, description) => {
  const systemPrompt = `You are an SEO expert. Generate exactly 3 highly relevant hashtags for a job post. Return ONLY a JSON object with this structure:
{
  "hashtags": ["#tag1", "#tag2", "#tag3"]
}`;

  const res = await callGeminiAPI(systemPrompt, `Job Title: ${title}\nDescription: ${description}`);
  return res.hashtags || res;
};

export const generateRecommendations = async (idea, planData, roadmapData) => {
  const systemPrompt = `You are a startup connector. Recommend 4 specific connections/resources for a startup based on their context. Return ONLY a JSON object with this structure:
{
  "recommendations": [
    { "type": "Mentor" | "Investor" | "Resource" | "Hire", "name": "...", "why": "..." }
  ]
}`;

  let context = `Idea: ${idea || 'A new startup'}`;
  if (planData) context += `\nPlan: ${JSON.stringify(planData).substring(0, 500)}`;
  
  const res = await callGeminiAPI(systemPrompt, context);
  return res.recommendations || res;
};

let aiHealthCache = null;
let lastAiHealthCheck = 0;

export const runAiTestSuite = async () => {
  // Cache the result for 5 minutes to avoid rate limiting
  if (aiHealthCache && Date.now() - lastAiHealthCheck < 5 * 60 * 1000) {
    return aiHealthCache;
  }
  
  const prompts = [
    { name: "Math", system: "Reply concisely.", user: "What is 2+2? Return only the number." },
    { name: "Logic", system: "Reply concisely.", user: "If A>B and B>C, is A>C? Return Yes or No." },
    { name: "Summarization", system: "Reply concisely.", user: "Summarize: The quick brown fox jumps over the lazy dog." },
    { name: "Translation", system: "Reply concisely.", user: "Translate 'Hello' to Spanish." },
    { name: "Classification", system: "Reply concisely.", user: "Classify 'Apple' as Fruit or Vegetable." },
    { name: "Sentiment", system: "Reply concisely.", user: "Sentiment of 'I love this!': Positive, Negative, or Neutral?" },
    { name: "Extraction", system: "Reply concisely.", user: "Extract email from 'Contact me at admin@example.com'." },
    { name: "Formatting", system: "Reply concisely.", user: "Format 'hello world' as Title Case." },
    { name: "Creative", system: "Reply concisely.", user: "Name a mythical creature." },
    { name: "Coding", system: "Reply concisely.", user: "Write a JS function that returns true." },
    { name: "Grammar", system: "Reply concisely.", user: "Fix grammar: 'He go to store'." },
    { name: "Knowledge", system: "Reply concisely.", user: "What is the capital of France?" }
  ];

  const results = [];
  let passed = 0;
  
  // Running sequentially to avoid bursting rate limits
  for (const p of prompts) {
    try {
      const start = Date.now();
      await callGeminiAPI(p.system, p.user, false, true);
      const latency = Date.now() - start;
      results.push({ name: p.name, status: "success", latency });
      passed++;
    } catch (e) {
      results.push({ name: p.name, status: "error", error: e.message });
    }
  }

  const score = Math.round((passed / prompts.length) * 100);
  aiHealthCache = { 
    score, 
    passed, 
    total: prompts.length, 
    details: results, 
    status: score === 100 ? 'excellent' : score >= 80 ? 'healthy' : 'degraded' 
  };
  lastAiHealthCheck = Date.now();
  
  return aiHealthCache;
};
