import { validateIdea } from '../services/aiService.js';
import AIReport from '../models/AIReport.js'; // Assuming we want to keep a record, even if we don't strictly require it yet.

export const runValidation = async (req, res) => {
  try {
    const { idea } = req.body;
    if (!idea || idea.trim().length < 10) {
      return res.status(400).json({ detail: "Please provide a more detailed startup idea (min 10 characters)." });
    }

    // Call the AI Service
    const validationResult = await validateIdea(idea);

    // Optionally save it to the database for history (using the provided AIReport model)
    // The AIReport model might have fields for userId, startupId, type, data.
    // For now, we will just return it to the frontend to keep it fast and simple.

    return res.json({
      success: true,
      data: validationResult
    });

  } catch (error) {
    console.error("Validation Controller Error:", error.message);
    if (error.message.includes("GEMINI_API_KEY is not set")) {
      return res.status(500).json({ detail: "Gemini API key is not configured on the server." });
    }
    return res.status(500).json({ detail: "An error occurred while validating the idea with AI." });
  }
};
