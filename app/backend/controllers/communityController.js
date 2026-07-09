import Idea from '../models/Idea.js';
import Post from '../models/Post.js';
import Like from '../models/Like.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';
import Event from '../models/Event.js';

export const getCommunityPosts = async (req, res) => {
  try {
    const ideas = await Idea.find({ status: { $ne: 'draft' } }).populate('author', 'name avatarUrl').lean();
    const posts = await Post.find({}).populate('author', 'name avatarUrl').lean();
    
    // Get all likes
    const allLikes = await Like.find({}).lean();
    const allComments = await Comment.find({ isDeleted: { $ne: true } }).lean();
    const latestEvents = await Event.find({ status: { $in: ['Upcoming', 'Live'] } })
      .populate('organizer', 'name avatarUrl')
      .sort({ startDate: 1 })
      .limit(4)
      .lean();

    const allItems = [...ideas, ...posts];
    const viewOps = allItems.map(item => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { viewCount: 1 } }
      }
    }));
    if (viewOps.length > 0) {
      const [ideaOps, postOps] = [
        viewOps.filter((_, index) => index < ideas.length),
        viewOps.filter((_, index) => index >= ideas.length)
      ];
      if (ideaOps.length > 0) await Idea.bulkWrite(ideaOps);
      if (postOps.length > 0) await Post.bulkWrite(postOps);
    }

    const buildBadges = (author, likesCount, commentsCount, viewsCount) => {
      const badges = [];
      if (author?.role) badges.push(author.role.charAt(0).toUpperCase() + author.role.slice(1));
      if (author?.isVerified) badges.push('Verified');
      if (likesCount >= 10) badges.push('Top Pick');
      if (commentsCount >= 5) badges.push('Conversation Starter');
      if (viewsCount >= 25) badges.push('Trending');
      return badges.slice(0, 3);
    };
    
    const formattedIdeas = ideas.map(idea => {
      const likesCount = allLikes.filter(l => l.targetId.toString() === idea._id.toString()).length;
      const commentsCount = allComments.filter(c => c.targetType === 'Idea' && c.targetId.toString() === idea._id.toString()).length;
      return {
        id: idea._id.toString(),
        type: 'idea',
        author: idea.author?.name || 'Unknown User',
        avatar: idea.author?.avatarUrl || `https://ui-avatars.com/api/?name=${idea.author?.name || 'Unknown'}&background=random`,
        authorId: idea.author?._id?.toString(),
        badges: buildBadges(idea.author, likesCount, commentsCount, idea.viewCount || 0),
        category: idea.tags && idea.tags.length > 0 ? idea.tags[0] : 'General',
        title: idea.title,
        body: idea.description,
        attachmentUrl: idea.attachmentUrl,
        likes: likesCount,
        comments: commentsCount,
        views: idea.viewCount || 0,
        time: idea.createdAt
      };
    });

    const formattedPosts = posts.map(post => {
      const likesCount = allLikes.filter(l => l.targetId.toString() === post._id.toString()).length;
      const commentsCount = allComments.filter(c => c.targetType === 'Post' && c.targetId.toString() === post._id.toString()).length;
      return {
        id: post._id.toString(),
        type: 'post',
        author: post.author?.name || 'Unknown User',
        avatar: post.author?.avatarUrl || `https://ui-avatars.com/api/?name=${post.author?.name || 'Unknown'}&background=random`,
        authorId: post.author?._id?.toString(),
        badges: buildBadges(post.author, likesCount, commentsCount, post.viewCount || 0),
        category: 'Discussion',
        title: null, // Posts might just be text
        body: post.content,
        attachmentUrl: post.attachmentUrl,
        likes: likesCount,
        comments: commentsCount,
        views: post.viewCount || 0,
        time: post.createdAt
      };
    });

    // Combine and sort by newest
    const combined = [...formattedIdeas, ...formattedPosts].sort((a, b) => new Date(b.time) - new Date(a.time));

    res.json({ success: true, data: { posts: combined, events: latestEvents } });
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

      const populatedIdea = await Idea.findById(idea._id).populate('author', 'name avatarUrl role isVerified').lean();
      return res.status(201).json({
        success: true,
        data: {
          id: populatedIdea._id.toString(),
          type: 'idea',
          author: populatedIdea.author?.name || 'Unknown User',
          avatar: populatedIdea.author?.avatarUrl || `https://ui-avatars.com/api/?name=${populatedIdea.author?.name || 'Unknown'}&background=random`,
          badges: [
            populatedIdea.author?.role ? populatedIdea.author.role.charAt(0).toUpperCase() + populatedIdea.author.role.slice(1) : null,
            populatedIdea.author?.isVerified ? 'Verified' : null
          ].filter(Boolean),
          category: populatedIdea.tags && populatedIdea.tags.length > 0 ? populatedIdea.tags[0] : 'General',
          title: populatedIdea.title,
          body: populatedIdea.description,
          attachmentUrl: populatedIdea.attachmentUrl,
          likes: 0,
          comments: 0,
          views: populatedIdea.viewCount || 0,
          time: populatedIdea.createdAt,
        }
      });
    } else {
      const post = await Post.create({
        content: body,
        author: author._id,
        attachmentUrl: attachmentUrl,
        visibility: 'public'
      });

      const populatedPost = await Post.findById(post._id).populate('author', 'name avatarUrl role isVerified').lean();
      return res.status(201).json({
        success: true,
        data: {
          id: populatedPost._id.toString(),
          type: 'post',
          author: populatedPost.author?.name || 'Unknown User',
          avatar: populatedPost.author?.avatarUrl || `https://ui-avatars.com/api/?name=${populatedPost.author?.name || 'Unknown'}&background=random`,
          badges: [
            populatedPost.author?.role ? populatedPost.author.role.charAt(0).toUpperCase() + populatedPost.author.role.slice(1) : null,
            populatedPost.author?.isVerified ? 'Verified' : null
          ].filter(Boolean),
          category: 'Discussion',
          title: null,
          body: populatedPost.content,
          attachmentUrl: populatedPost.attachmentUrl,
          likes: 0,
          comments: 0,
          views: populatedPost.viewCount || 0,
          time: populatedPost.createdAt,
        }
      });
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

export const getComments = async (req, res) => {
  try {
    const { targetType, targetId } = req.params;
    const comments = await Comment.find({ targetType, targetId, isDeleted: { $ne: true } })
      .populate('author', 'name avatarUrl role isVerified')
      .sort({ createdAt: 1 })
      .lean();

    const formatted = comments.map(comment => ({
      id: comment._id.toString(),
      content: comment.content,
      author: comment.author?.name || 'Unknown User',
      avatar: comment.author?.avatarUrl || `https://ui-avatars.com/api/?name=${comment.author?.name || 'Unknown'}&background=random`,
      badges: [
        comment.author?.role ? comment.author.role.charAt(0).toUpperCase() + comment.author.role.slice(1) : null,
        comment.author?.isVerified ? 'Verified' : null
      ].filter(Boolean),
      createdAt: comment.createdAt
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ success: false, detail: 'Failed to fetch comments' });
  }
};

export const createComment = async (req, res) => {
  try {
    const { targetType, targetId } = req.params;
    const { content, parentComment } = req.body;

    if (!content || content.trim().length < 2) {
      return res.status(400).json({ success: false, detail: 'Comment text is required.' });
    }

    const author = await User.findOne({});
    if (!author) {
      return res.status(404).json({ success: false, detail: 'User not found.' });
    }

    const comment = await Comment.create({
      content: content.trim(),
      author: author._id,
      targetType,
      targetId,
      parentComment: parentComment || null
    });

    const populated = await Comment.findById(comment._id).populate('author', 'name avatarUrl role isVerified').lean();

    res.status(201).json({
      success: true,
      data: {
        id: populated._id.toString(),
        content: populated.content,
        author: populated.author?.name || 'Unknown User',
        avatar: populated.author?.avatarUrl || `https://ui-avatars.com/api/?name=${populated.author?.name || 'Unknown'}&background=random`,
        badges: [
          populated.author?.role ? populated.author.role.charAt(0).toUpperCase() + populated.author.role.slice(1) : null,
          populated.author?.isVerified ? 'Verified' : null
        ].filter(Boolean),
        createdAt: populated.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ success: false, detail: 'Failed to create comment' });
  }
};
