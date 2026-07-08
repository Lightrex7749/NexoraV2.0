import Idea from '../models/Idea.js';
import Post from '../models/Post.js';
import Like from '../models/Like.js';
import User from '../models/User.js';

export const getCommunityPosts = async (req, res) => {
  try {
    const ideas = await Idea.find({ status: { $ne: 'draft' } }).populate('author', 'name avatarUrl').lean();
    const posts = await Post.find({}).populate('author', 'name avatarUrl').lean();
    
    // Get all likes
    const allLikes = await Like.find({}).lean();
    
    const formattedIdeas = ideas.map(idea => {
      const likesCount = allLikes.filter(l => l.targetId.toString() === idea._id.toString()).length;
      return {
        id: idea._id.toString(),
        type: 'idea',
        author: idea.author?.name || 'Unknown User',
        avatar: idea.author?.avatarUrl || `https://ui-avatars.com/api/?name=${idea.author?.name || 'Unknown'}&background=random`,
        category: idea.tags && idea.tags.length > 0 ? idea.tags[0] : 'General',
        title: idea.title,
        body: idea.description,
        attachmentUrl: idea.attachmentUrl,
        likes: likesCount,
        comments: Math.floor(Math.random() * 50),
        time: idea.createdAt
      };
    });

    const formattedPosts = posts.map(post => {
      const likesCount = allLikes.filter(l => l.targetId.toString() === post._id.toString()).length;
      return {
        id: post._id.toString(),
        type: 'post',
        author: post.author?.name || 'Unknown User',
        avatar: post.author?.avatarUrl || `https://ui-avatars.com/api/?name=${post.author?.name || 'Unknown'}&background=random`,
        category: 'Discussion',
        title: null, // Posts might just be text
        body: post.content,
        attachmentUrl: post.attachmentUrl,
        likes: likesCount,
        comments: Math.floor(Math.random() * 50),
        time: post.createdAt
      };
    });

    // Combine and sort by newest
    const combined = [...formattedIdeas, ...formattedPosts].sort((a, b) => new Date(b.time) - new Date(a.time));

    res.json({ success: true, data: combined });
  } catch (error) {
    console.error("Error fetching community posts:", error);
    res.status(500).json({ success: false, detail: "Failed to fetch posts" });
  }
};

export const createCommunityPost = async (req, res) => {
  try {
    const { type, title, body, category, attachmentUrl } = req.body;
    if (!body) {
      return res.status(400).json({ success: false, detail: "Body is required." });
    }

    let author = await User.findOne({});
    if (!author) {
      author = await User.create({ name: 'Test User', email: 'test@example.com', passwordHash: 'abc', role: 'founder' });
    }

    if (type === 'idea') {
      const idea = await Idea.create({
        title: title || 'Untitled Idea',
        description: body,
        author: author._id,
        tags: category ? [category] : ['General'],
        attachmentUrl: attachmentUrl,
        status: 'submitted'
      });
      return res.status(201).json({ success: true, data: idea });
    } else {
      const post = await Post.create({
        content: body,
        author: author._id,
        attachmentUrl: attachmentUrl,
        visibility: 'public'
      });
      return res.status(201).json({ success: true, data: post });
    }
  } catch (error) {
    console.error("Error creating community post:", error);
    res.status(500).json({ success: false, detail: "Failed to create post" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { targetId, targetType } = req.body;
    const user = await User.findOne({}); // Dummy "me"

    const existingLike = await Like.findOne({ user: user._id, targetId, targetType });
    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      return res.json({ success: true, data: { liked: false } });
    } else {
      await Like.create({ user: user._id, targetId, targetType });
      return res.json({ success: true, data: { liked: true } });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ success: false, detail: "Failed to toggle like" });
  }
};
