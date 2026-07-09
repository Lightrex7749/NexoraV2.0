import Startup from '../models/Startup.js';
import User from '../models/User.js';
import Like from '../models/Like.js';
import { validateIdea, generateHashtags } from '../services/aiService.js';

export const getStartups = async (req, res) => {
  try {
    const startups = await Startup.find({}).populate('founder', 'name').lean();
    
    // Get all startup likes
    const allLikes = await Like.find({ targetType: 'Startup' }).lean();
    
    // Map to the frontend's expected format
    const formatted = startups.map(s => {
      const likesCount = allLikes.filter(l => l.targetId.toString() === s._id.toString()).length;
      return {
        id: s._id.toString(),
        name: s.name,
        tagline: s.tagline || 'Building the future',
        hashtags: s.hashtags || [],
        aiScore: s.aiScore ?? null,
        industry: 'Tech', // placeholder
        stage: s.stage ? s.stage.charAt(0).toUpperCase() + s.stage.slice(1) : 'Idea',
        status: s.isPublished ? 'APPROVED' : 'PENDING',
        logo: s.name.substring(0, 2).toUpperCase(),
        owner: s.founder?.name || 'Unknown',
        location: s.location || '',
        progress: Math.floor(Math.random() * 100), // mock progress since it's not in DB
        likes: likesCount
      };
    });

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Error fetching startups:", error);
    res.status(500).json({ success: false, detail: "Failed to fetch startups" });
  }
};

export const getStartupById = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id).populate('founder', 'firstName lastName').lean();
    if (!startup) {
      return res.status(404).json({ success: false, detail: "Startup not found" });
    }

    const formatted = {
      id: startup._id.toString(),
      name: startup.name,
      tagline: startup.tagline || 'Building the future',
      description: startup.description || 'No description provided.',
      idea: startup.idea || '',
      industry: 'Tech', // placeholder
      stage: startup.stage ? startup.stage.charAt(0).toUpperCase() + startup.stage.slice(1) : 'Idea',
      status: startup.isPublished ? 'APPROVED' : 'PENDING',
      logo: startup.name.substring(0, 2).toUpperCase(),
      owner: startup.founder ? startup.founder.name || `${startup.founder.firstName} ${startup.founder.lastName}` : 'Unknown',
      location: startup.location || '',
      hashtags: startup.hashtags || [],
      aiScore: startup.aiScore ?? null,
      aiSummary: startup.aiSummary || '',
      progress: Math.floor(Math.random() * 100),
    };

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Error fetching startup by id:", error);
    res.status(500).json({ success: false, detail: "Failed to fetch startup" });
  }
};

export const updateStartup = async (req, res) => {
  try {
    const startup = await Startup.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!startup) {
      return res.status(404).json({ success: false, detail: "Startup not found" });
    }
    res.json({ success: true, data: startup });
  } catch (error) {
    console.error("Error updating startup:", error);
    res.status(500).json({ success: false, detail: "Failed to update startup" });
  }
};

export const createStartup = async (req, res) => {
  try {
    const { name, tagline, description, idea, location, website, stage } = req.body;
    const startupName = (name || '').trim();
    const startupIdea = (idea || description || tagline || startupName).trim();

    if (!startupName || startupName.length < 2) {
      return res.status(400).json({ success: false, detail: 'Startup name is required.' });
    }

    if (!startupIdea || startupIdea.length < 10) {
      return res.status(400).json({ success: false, detail: 'Please provide a more detailed startup idea.' });
    }

    const owner = await User.findOne({});
    if (!owner) {
      return res.status(404).json({ success: false, detail: 'User not found.' });
    }

    let aiResult = null;
    let hashtags = [];
    let aiScore = null;
    let aiSummary = '';

    try {
      aiResult = await validateIdea(startupIdea);
      aiScore = typeof aiResult?.score === 'number' ? aiResult.score : null;
      aiSummary = aiScore != null ? `AI evaluation score: ${aiScore}/100.` : 'AI evaluation completed.';

      const generatedTags = await generateHashtags(startupName, startupIdea);
      hashtags = Array.isArray(generatedTags) ? generatedTags : (generatedTags?.hashtags || []);
    } catch (aiError) {
      console.error('Startup AI enrichment failed:', aiError);
      const fallbackWords = `${startupName} ${startupIdea}`
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 3)
        .slice(0, 3);
      hashtags = fallbackWords.length > 0 ? fallbackWords.map(word => `#${word}`) : ['#startup', '#founder', '#build'];
      aiScore = 72;
      aiSummary = 'AI evaluation is temporarily unavailable, so the startup was created with a fallback score.';
    }

    const startup = await Startup.create({
      name: startupName,
      tagline: tagline || startupIdea,
      description: description || startupIdea,
      idea: startupIdea,
      location: location || '',
      website: website || '',
      stage: stage || 'idea',
      founder: owner._id,
      hashtags,
      aiScore,
      aiSummary,
      isPublished: false
    });

    const formatted = {
      id: startup._id.toString(),
      name: startup.name,
      tagline: startup.tagline,
      description: startup.description,
      idea: startup.idea,
      industry: 'Tech',
      stage: startup.stage.charAt(0).toUpperCase() + startup.stage.slice(1),
      status: 'PENDING',
      logo: startup.name.substring(0, 2).toUpperCase(),
      owner: owner.name,
      location: startup.location || '',
      hashtags: startup.hashtags || [],
      aiScore: startup.aiScore ?? null,
      aiSummary: startup.aiSummary || '',
      progress: Math.floor(Math.random() * 100),
      likes: 0
    };

    return res.status(201).json({ success: true, data: formatted });
  } catch (error) {
    console.error('Error creating startup:', error);
    return res.status(500).json({ success: false, detail: 'Failed to create startup' });
  }
};
