import User from '../models/User.js';
import Follow from '../models/Follow.js';
import Connection from '../models/Connection.js';
import mongoose from 'mongoose';

export const getProfile = async (req, res) => {
  try {
    // For demo, just get the first user or a specific test user
    const user = await User.findOne({});
    if (!user) {
      return res.status(404).json({ success: false, detail: "User not found" });
    }

    // Get followers/following count
    const followers = await Follow.countDocuments({ target: user._id });
    const following = await Follow.countDocuments({ follower: user._id });

    res.json({
      success: true,
      data: {
        ...user.toObject(),
        followers,
        following
      }
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, detail: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findOne({});
    if (!user) {
      return res.status(404).json({ success: false, detail: "User not found" });
    }

    const { name, bio, headline, location, industry, resumeUrl, skills, interests, workExperience, projects } = req.body;
    
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (headline) user.headline = headline;
    if (location) user.location = location;
    if (industry) user.industry = industry;
    if (resumeUrl) user.resumeUrl = resumeUrl;
    if (skills) user.skills = skills;
    if (interests) user.interests = interests;
    if (workExperience) user.workExperience = workExperience;
    if (projects) user.projects = projects;

    await user.save();
    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, detail: "Failed to update profile" });
  }
};

export const followUser = async (req, res) => {
  try {
    const { targetId } = req.body;
    const follower = await User.findOne({}); // Dummy "me"
    
    if (!targetId || targetId === follower._id.toString()) {
      return res.status(400).json({ success: false, detail: "Invalid target user" });
    }

    const existingFollow = await Follow.findOne({ follower: follower._id, target: targetId });
    if (existingFollow) {
      // Unfollow
      await Follow.deleteOne({ _id: existingFollow._id });
      return res.json({ success: true, data: { followed: false } });
    } else {
      // Follow
      await Follow.create({ follower: follower._id, target: targetId });
      return res.json({ success: true, data: { followed: true } });
    }
  } catch (error) {
    console.error("Error toggling follow:", error);
    res.status(500).json({ success: false, detail: "Failed to toggle follow" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const currentUser = await User.findOne({});
    const users = await User.find({ _id: { $ne: currentUser._id } }).lean();
    
    // Map to match network mock format
    const formatted = users.map(u => ({
      id: u._id.toString(),
      name: u.name,
      avatar: u.avatarUrl || `https://ui-avatars.com/api/?name=${u.name || 'User'}&background=random`,
      role: u.role || 'Member',
      firm: u.company || 'Independent',
      verified: true,
      location: u.location || 'Remote',
      industry: u.industry || 'Tech'
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ success: false, detail: "Failed to fetch users" });
  }
};

export const connectUser = async (req, res) => {
  try {
    const { targetId } = req.params;
    const currentUser = await User.findOne({});
    
    if (!targetId || targetId === currentUser._id.toString()) {
      return res.status(400).json({ success: false, detail: "Invalid target user" });
    }

    const existingConnection = await Connection.findOne({
      $or: [
        { fromUser: currentUser._id, toUser: targetId },
        { fromUser: targetId, toUser: currentUser._id }
      ]
    });

    if (existingConnection) {
      return res.status(400).json({ success: false, detail: "Connection already exists or is pending" });
    }

    await Connection.create({
      fromUser: currentUser._id,
      toUser: targetId,
      status: 'pending'
    });

    res.json({ success: true, data: { status: 'pending' } });
  } catch (error) {
    console.error("Error creating connection:", error);
    res.status(500).json({ success: false, detail: "Failed to create connection" });
  }
};
