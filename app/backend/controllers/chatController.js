import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import User from '../models/User.js';

export const getConversations = async (req, res) => {
  try {
    // Return all users as "conversations" for demo purposes
    const users = await User.find({}).lean();
    const formatted = users.map(u => ({
      id: u._id.toString(),
      name: `${u.firstName || u.name} ${u.lastName || ''}`,
      role: u.role || 'Member',
      avatar: `https://ui-avatars.com/api/?name=${u.firstName || u.name}+${u.lastName || ''}&background=random`,
      time: '1h',
      last: 'Hello!',
      unread: 0
    }));
    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Error fetching convos:", error);
    res.status(500).json({ success: false, detail: "Failed to fetch conversations" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params; // this is the other user's ID
    const messages = await Message.find({
      $or: [
        { sender: userId },
        { receiver: userId }
      ]
    }).sort({ createdAt: 1 }).lean();

    const formatted = messages.map(m => ({
      id: m._id.toString(),
      from: m.sender.toString() === userId ? 'them' : 'me',
      body: m.content,
      attachmentUrl: m.attachmentUrl,
      time: new Date(m.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, detail: "Failed to fetch messages" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content, attachmentUrl } = req.body;
    let me = await User.findOne({}); // Dummy "me"

    // Find or create chat
    let chat = await Chat.findOne({
      participants: { $all: [me._id, receiverId] }
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [me._id, receiverId],
        type: 'direct',
        unreadCount: new Map([[me._id.toString(), 0], [receiverId.toString(), 1]])
      });
    }

    const newMsg = await Message.create({
      chat: chat._id,
      sender: me._id,
      receiver: receiverId,
      content,
      attachmentUrl,
      read: false
    });

    chat.lastMessage = newMsg._id;
    await chat.save();

    res.status(201).json({ 
      success: true, 
      data: {
        id: newMsg._id.toString(),
        from: 'me',
        body: newMsg.content,
        attachmentUrl: newMsg.attachmentUrl,
        time: new Date(newMsg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      } 
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, detail: "Failed to send message" });
  }
};
