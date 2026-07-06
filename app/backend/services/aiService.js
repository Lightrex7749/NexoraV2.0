import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI = null;

const getGenAI = () => {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      throw new Error("GEMINI_API_KEY is not set or invalid in .env file");
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
};

export const validateIdea = async (ideaText) => {
  const ai = getGenAI();
  // Using gemini-1.5-flash as it is fast and supports JSON response format well
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an expert startup advisor and VC evaluator.
    Please evaluate the following startup idea and provide a structured JSON analysis.
    The response MUST be a valid JSON object matching exactly this structure (no markdown formatting, no code blocks):
    {
      "score": <number out of 100 representing viability and potential>,
      "swot": {
        "Strengths": ["point 1", "point 2"],
        "Weaknesses": ["point 1", "point 2"],
        "Opportunities": ["point 1", "point 2"],
        "Threats": ["point 1", "point 2"]
      },
      "risks": [
        { "level": "High" | "Medium" | "Low", "label": "description of risk" },
        ...
      ],
      "suggestions": ["suggestion 1", "suggestion 2"]
    }

    Startup Idea: "${ideaText}"
  `;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const responseText = result.response.text();
    // Parse the JSON. The responseMimeType guarantees valid JSON output.
    const validationData = JSON.parse(responseText);
    return validationData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to validate idea via Gemini API");
  }
};
