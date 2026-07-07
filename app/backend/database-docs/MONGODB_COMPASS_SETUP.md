# MongoDB Compass Local Setup Guide

## 📋 Current Configuration

Your `.env` is now set to:
```env
MONGODB_URI=mongodb://localhost:27017/nexora
PORT=5000
NODE_ENV=development
```

---

## 🚀 Step-by-Step Setup

### Step 1: Install MongoDB Community Edition

#### **Windows**
1. Download from: https://www.mongodb.com/try/download/community
2. Run the installer (MSI file)
3. Choose "Complete" installation
4. Check "Install MongoDB as a Service"
5. Finish installation
6. MongoDB will auto-start

**Verify installation**:
```bash
mongod --version
```

#### **Mac (Homebrew)**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Verify**:
```bash
brew services list
```

#### **Linux (Ubuntu)**
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl status mongod
```

---

### Step 2: Install MongoDB Compass

1. Download from: https://www.mongodb.com/try/download/compass
2. Install for your OS
3. Launch MongoDB Compass

---

### Step 3: Connect with Compass

1. Open **MongoDB Compass**
2. Connection string should auto-populate:
   ```
   mongodb://localhost:27017
   ```
3. Click "Connect"
4. You should see your local MongoDB server

---

### Step 4: Create Database

In MongoDB Compass:
1. Click **"+" button** next to "Databases"
2. Database Name: `nexora`
3. Collection Name: `users` (or any collection)
4. Click "Create Database"

---

## ✅ Test Your Connection

### Option 1: Quick Test
```bash
npm run test-db
```

Expected output:
```
📊 MongoDB Connection Test

Connecting to MongoDB (Local)...
URI: mongodb://localhost:27017/nexora
✅ SUCCESS! Connected to MongoDB

Host: localhost
Port: 27017
Database: nexora
```

### Option 2: Start the Server
```bash
npm run dev
```

Expected output:
```
Connecting to MongoDB (Local)...
URI: mongodb://localhost:27017/nexora
✓ MongoDB Connected: localhost:27017
✓ Database: nexora
✓ Server running on http://localhost:5000
✓ Environment: development
✓ MongoDB connection established
```

### Option 3: Seed Sample Data
```bash
npm run seed
```

This will populate the database with sample data.

---

## 🧪 Verify Everything Works

1. **Check MongoDB is running**:
   - Look for MongoDB Compass connection
   - Or run: `mongosh` in terminal

2. **Check Server is running**:
   ```bash
   npm run dev
   ```

3. **Test API endpoint**:
   ```bash
   curl http://localhost:5000/api/health
   ```
   
   Expected response:
   ```json
   {
     "status": "Server is running",
     "timestamp": "2026-07-05T..."
   }
   ```

4. **View data in Compass**:
   - Open MongoDB Compass
   - Navigate to `nexora` → Collections
   - See all your data live

---

## 🔧 Troubleshooting

### MongoDB Not Running?

**Windows**:
```bash
# Check if service is running
Get-Service MongoDB

# If not running, start it
Start-Service MongoDB

# Or manually start mongod
mongod
```

**Mac**:
```bash
# Check status
brew services list

# Start if stopped
brew services start mongodb-community
```

**Linux**:
```bash
# Check status
sudo systemctl status mongod

# Start if stopped
sudo systemctl start mongod
```

---

### Connection Refused?

1. Make sure MongoDB is running
2. Check port 27017 is not blocked
3. Verify connection string in .env

```env
# Should be exactly:
MONGODB_URI=mongodb://localhost:27017/nexora
```

---

### Port 27017 Already in Use?

If another process is using port 27017:
```bash
# Find process using port
lsof -i :27017

# Or change MongoDB port in config
# Then update .env to match
```

---

## 📊 Data in Compass

Once connected, you can:
- ✓ View collections
- ✓ Insert documents
- ✓ Query data
- ✓ Create indexes
- ✓ Export/import data
- ✓ Monitor performance

---

## ✨ You're All Set!

Now you have:
- ✅ Local MongoDB running
- ✅ MongoDB Compass for visual management
- ✅ Express server on port 5000
- ✅ All 30 collections ready to use

**Start developing!**

```bash
npm run dev
```

Then open http://localhost:5000/api in your browser!
