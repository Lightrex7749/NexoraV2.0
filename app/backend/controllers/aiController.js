import { validateIdea, generatePlan as generatePlanSvc, generateRoadmap as generateRoadmapSvc, chatWithAI, generateRecommendations as generateRecommendationsSvc, runAiTestSuite } from '../services/aiService.js';
import AIReport from '../models/AIReport.js';
import AIChatSession from '../models/AIChatSession.js';

export const runValidation = async (req, res) => {
  try {
    const { idea } = req.body;
    if (!idea || idea.trim().length < 10) return res.status(400).json({ detail: "Please provide a more detailed startup idea." });
    const validationResult = await validateIdea(idea);
    return res.json({ success: true, data: validationResult });
  } catch (error) {
    console.error("Validation Controller Error:", error);
    return res.status(500).json({ detail: error.message || "An error occurred while validating the idea with AI." });
  }
};

export const generatePlan = async (req, res) => {
  try {
    const { idea } = req.body;
    const plan = await generatePlanSvc(idea);
    return res.json({ success: true, data: plan });
  } catch (error) {
    console.error("Plan Generation Error:", error);
    return res.status(500).json({ detail: error.message || "An error occurred while generating the plan." });
  }
};

export const generateRoadmap = async (req, res) => {
  try {
    const { idea } = req.body;
    const roadmap = await generateRoadmapSvc(idea);
    return res.json({ success: true, data: roadmap });
  } catch (error) {
    console.error("Roadmap Generation Error:", error);
    return res.status(500).json({ detail: error.message || "An error occurred while generating the roadmap." });
  }
};

export const generateRecommendations = async (req, res) => {
  try {
    const { idea, planData, roadmapData } = req.body;
    const recommendations = await generateRecommendationsSvc(idea, planData, roadmapData);
    return res.json({ success: true, data: recommendations });
  } catch (error) {
    console.error("Recommendations Error:", error);
    return res.status(500).json({ detail: error.message || "An error occurred while generating recommendations." });
  }
};

export const chat = async (req, res) => {
  try {
    const { message, history, sessionId } = req.body;
    let fileData = null;
    if (req.file) {
      fileData = { filename: req.file.originalname, size: req.file.size };
    }
    const parsedHistory = history ? JSON.parse(history) : [];
    
    // Call the AI
    const reply = await chatWithAI(message, fileData, parsedHistory);
    
    // DB Persistence
    let session;
    if (sessionId) {
      session = await AIChatSession.findById(sessionId);
      if (session) {
        session.messages.push({ role: 'user', content: message, file: fileData?.filename });
        session.messages.push({ role: 'ai', content: reply.reply });
        await session.save();
      }
    }
    
    if (!session) {
      // Create a new session
      const titleStr = message.substring(0, 40) + (message.length > 40 ? '...' : '');
      session = new AIChatSession({
        title: titleStr,
        messages: [
          { role: 'user', content: message, file: fileData?.filename },
          { role: 'ai', content: reply.reply }
        ]
      });
      await session.save();
    }
    
    return res.json({ success: true, data: { ...reply, sessionId: session._id } });
  } catch (error) {
    console.error("Chat Error:", error);
    return res.status(500).json({ detail: error.message || "An error occurred during chat." });
  }
};

export const getChatSessions = async (req, res) => {
  try {
    const sessions = await AIChatSession.find().sort({ updatedAt: -1 }).select('title updatedAt');
    return res.json({ success: true, data: sessions });
  } catch (error) {
    return res.status(500).json({ detail: error.message || "Failed to fetch chat sessions." });
  }
};

export const getSingleSession = async (req, res) => {
  try {
    const session = await AIChatSession.findById(req.params.id);
    if (!session) return res.status(404).json({ detail: "Session not found." });
    return res.json({ success: true, data: session });
  } catch (error) {
    return res.status(500).json({ detail: error.message || "Failed to fetch session." });
  }
};

export const deleteSession = async (req, res) => {
  try {
    await AIChatSession.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ detail: error.message || "Failed to delete session." });
  }
};

export const checkAiHealth = async (req, res) => {
  try {
    const health = await runAiTestSuite();
    return res.json({ success: true, data: health });
  } catch (error) {
    console.error("AI Health Check Error:", error);
    return res.status(500).json({ success: false, detail: "Failed to run AI test suite." });
  }
};

