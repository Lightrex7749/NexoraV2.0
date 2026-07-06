import Startup from '../models/Startup.js';
import User from '../models/User.js';
import Like from '../models/Like.js';

export const getStartups = async (req, res) => {
  try {
    const startups = await Startup.find({}).populate('founder', 'firstName lastName').lean();
    
    // Get all startup likes
    const allLikes = await Like.find({ targetType: 'Startup' }).lean();
    
    // Map to the frontend's expected format
    const formatted = startups.map(s => {
      const likesCount = allLikes.filter(l => l.targetId.toString() === s._id.toString()).length;
      return {
        id: s._id.toString(),
        name: s.name,
        tagline: s.tagline || 'Building the future',
        industry: 'Tech', // placeholder
        stage: s.stage ? s.stage.charAt(0).toUpperCase() + s.stage.slice(1) : 'Idea',
        status: s.isPublished ? 'APPROVED' : 'PENDING',
        logo: s.name.substring(0, 2).toUpperCase(),
        owner: s.founder ? `${s.founder.firstName} ${s.founder.lastName}` : 'Unknown',
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
      industry: 'Tech', // placeholder
      stage: startup.stage ? startup.stage.charAt(0).toUpperCase() + startup.stage.slice(1) : 'Idea',
      status: startup.isPublished ? 'APPROVED' : 'PENDING',
      logo: startup.name.substring(0, 2).toUpperCase(),
      owner: startup.founder ? `${startup.founder.firstName} ${startup.founder.lastName}` : 'Unknown',
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
