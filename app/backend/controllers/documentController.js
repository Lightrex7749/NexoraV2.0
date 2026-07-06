import Document from '../models/Document.js';
import User from '../models/User.js';

export const getDocuments = async (req, res) => {
  try {
    let user = await User.findOne({});
    if (!user) {
      return res.status(401).json({ success: false, detail: "Not authenticated" });
    }

    const documents = await Document.find({ owner: user._id }).lean();
    
    const formatted = documents.map(d => ({
      id: d._id.toString(),
      title: d.title,
      fileUrl: d.fileUrl,
      type: d.type,
      uploadedAt: d.uploadedAt
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ success: false, detail: "Failed to fetch documents" });
  }
};

export const uploadDocument = async (req, res) => {
  try {
    const { title, fileUrl, type } = req.body;
    
    let user = await User.findOne({});
    if (!user) {
      return res.status(401).json({ success: false, detail: "Not authenticated" });
    }

    const doc = await Document.create({
      title,
      owner: user._id,
      fileUrl,
      type: type || 'other'
    });

    res.status(201).json({ success: true, data: {
      id: doc._id.toString(),
      title: doc.title,
      fileUrl: doc.fileUrl,
      type: doc.type,
      uploadedAt: doc.uploadedAt
    }});
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ success: false, detail: "Failed to upload document" });
  }
};
