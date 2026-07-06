import express from "express";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "../nexora-database/models/User.js";
import Startup from "../nexora-database/models/Startup.js";
import Idea from "../nexora-database/models/Idea.js";

const app = express();

// Middleware
app.use(express.json());

// Connect Database
connectDB();

const sendError = (res, status, message) => {
  res.status(status).json({ success: false, message });
};

const sanitizeUser = (user) => {
  const userObject = user.toObject ? user.toObject() : user;
  const { passwordHash, ...safeUser } = userObject;
  return safeUser;
};

const registerCrudRoutes = (resourceName, Model) => {
  app.get(`/api/${resourceName}`, async (req, res) => {
    try {
      const items = await Model.find({}).sort({ createdAt: -1 });
      res.json(items);
    } catch (error) {
      sendError(res, 500, error.message);
    }
  });

  app.post(`/api/${resourceName}`, async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      sendError(res, 400, error.message);
    }
  });

  app.get(`/api/${resourceName}/:id`, async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return sendError(res, 404, `${resourceName.slice(0, -1)} not found`);
      res.json(item);
    } catch (error) {
      sendError(res, 400, error.message);
    }
  });

  app.put(`/api/${resourceName}/:id`, async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return sendError(res, 404, `${resourceName.slice(0, -1)} not found`);
      res.json(item);
    } catch (error) {
      sendError(res, 400, error.message);
    }
  });

  app.delete(`/api/${resourceName}/:id`, async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return sendError(res, 404, `${resourceName.slice(0, -1)} not found`);
      res.json({ success: true, message: `${resourceName.slice(0, -1)} deleted` });
    } catch (error) {
      sendError(res, 400, error.message);
    }
  });
};

registerCrudRoutes("users", User);
registerCrudRoutes("startups", Startup);
registerCrudRoutes("ideas", Idea);

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !password) {
      return sendError(res, 400, "Email and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 400, "A user with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name || email,
      email,
      passwordHash,
      role: role || "user",
    });

    res.status(201).json({ success: true, user: sanitizeUser(user) });
  } catch (error) {
    sendError(res, 400, error.message);
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return sendError(res, 401, "Invalid password");
    }

    res.json({ success: true, user: sanitizeUser(user) });
  } catch (error) {
    sendError(res, 400, error.message);
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Change the port here 👇
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
