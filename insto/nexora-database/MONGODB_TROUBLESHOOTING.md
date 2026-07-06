# MongoDB Connection Troubleshooting Guide

## 🚨 Quick Diagnosis

Run the troubleshooter first:
```bash
npm run troubleshoot
```

This will check:
- ✓ .env configuration
- ✓ Connection string format
- ✓ DNS resolution
- ✓ Network connectivity
- ✓ MongoDB credentials

---

## 🔧 Fix Checklist

### 1. **Verify MongoDB Atlas Cluster is Running**

**Step 1**: Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
```
1. Log in to your account
2. Go to "Database" → "Clusters"
3. Look for cluster "nexora" or "Cluster0"
4. Check status: Should show a green checkmark ✓
5. If paused (grayed out): Click "Resume" button
```

**Step 2**: Verify the cluster details
```
1. Click on your cluster name
2. Go to "Connect" button
3. Choose "Drivers"
4. Select "Node.js"
5. Copy the connection string
```

### 2. **Check IP Whitelist (Most Common Issue)**

**Step 1**: Add your IP to whitelist
```
1. Go to MongoDB Atlas Dashboard
2. Click "Network Access" (Left menu)
3. Click "Add IP Address"
4. Options:
   a. "Add Current IP" (Recommended for your current device)
   b. "Allow access from anywhere" → 0.0.0.0/0 (Development only!)
5. Click "Confirm"
6. Wait 2-5 minutes for changes to take effect
```

**Step 2**: Find your current IP
```
Windows: Run Command Prompt
  ipconfig

Mac/Linux: Run Terminal
  ifconfig
  
Or visit: https://whatismyipaddress.com
```

### 3. **Verify Credentials**

**Step 1**: Check database user
```
1. MongoDB Atlas Dashboard
2. "Security" → "Database Access"
3. Find your database user (e.g., "pris4506134_db_user")
4. Verify username matches .env
5. If you forgot password:
   - Click "Edit"
   - Click "Edit Password"
   - Generate new password
   - Update .env file
```

**Step 2**: Update .env with correct credentials
```
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/DATABASE?retryWrites=true&w=majority&appName=NEXORA
```

Replace:
- `USERNAME`: Your database user
- `PASSWORD`: Your password (URL encode special characters!)
- `cluster`: Your cluster name
- `DATABASE`: Your database name

**URL Encoding Special Characters**:
```
@ → %40
: → %3A
# → %23
! → %21
$ → %24
% → %25
^ → %5E
& → %26
```

Example with special password `p@ss!word`:
```
p%40ss%21word
```

### 4. **Verify Connection String Format**

Correct format:
```
mongodb+srv://username:password@cluster.mongodb.net/databasename?retryWrites=true&w=majority&appName=NEXORA
```

Check your .env:
- [ ] Protocol is `mongodb+srv://` (for SRV records)
- [ ] Username and password are present
- [ ] No spaces
- [ ] Cluster name is correct
- [ ] Database name is specified

### 5. **Network & Firewall**

**Windows**:
```
1. Check Windows Firewall
2. Go to Windows Defender Firewall
3. Allow Node.js through firewall
4. Restart your terminal
```

**Mac**:
```
1. System Preferences → Security & Privacy
2. Firewall Options
3. Make sure firewalls aren't blocking
```

**Try different network**:
```
If connection fails:
- Try connecting from mobile hotspot
- Try connecting from different WiFi
- This helps isolate network issues
```

---

## 🧪 Testing Connection

### **Step 1**: Run the troubleshooter
```bash
npm run troubleshoot
```

### **Step 2**: Try to start server
```bash
npm run dev
```

Expected output:
```
Connecting to MongoDB Atlas...
URI: mongodb+srv://pris4506134_db_user:hello123@nexora.bql2ggj...
✓ MongoDB Connected: nexora.bql2ggj.mongodb.net
✓ Server running on http://localhost:5000
✓ Environment: development
✓ MongoDB connection established
```

### **Step 3**: Test endpoints
```bash
# Health check
curl http://localhost:5000/api/health

# API base
curl http://localhost:5000/api
```

---

## 🆘 Still Not Working?

### **Debug Mode**: Enable detailed logging

Create a debug version:
```javascript
// debug-db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Enable debug mode
mongoose.set('debug', true);

const conn = await mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
});

console.log('Connected!', conn.connection.host);
```

Run:
```bash
node debug-db.js
```

### **Common Error Messages & Solutions**

| Error | Cause | Solution |
|-------|-------|----------|
| `ECONNREFUSED` | Connection refused | Check if cluster is running |
| `ENOTFOUND` | DNS resolution failed | Check cluster name spelling |
| `authentication failed` | Wrong credentials | Verify username/password |
| `connect ETIMEDOUT` | Connection timeout | Check IP whitelist |
| `getaddrinfo ENOTFOUND` | Invalid host | Check connection string format |
| `MongoAuthenticationError` | Auth failed | Reset database user password |

### **MongoDB Atlas Status Page**

Check if MongoDB is having issues:
https://status.mongodb.com

---

## 🔄 Complete Connection Reset

If nothing works, try starting fresh:

### **1. Delete and recreate database user**
```
1. MongoDB Atlas → Security → Database Access
2. Click trash icon next to your user
3. Click "Delete User"
4. Click "Add New Database User"
5. Generate password
6. Copy everything
7. Update .env
```

### **2. Reset network access**
```
1. MongoDB Atlas → Network Access
2. Delete your IP address
3. Click "Add IP Address"
4. Choose "Add Current IP"
5. Confirm
6. Wait 5 minutes
```

### **3. Update .env file**
```env
MONGODB_URI=mongodb+srv://NEW_USERNAME:NEW_PASSWORD@nexora.bql2ggj.mongodb.net/nexora?retryWrites=true&w=majority&appName=NEXORA
PORT=5000
NODE_ENV=development
```

### **4. Test again**
```bash
npm run troubleshoot
npm run dev
```

---

## 📞 Need Help?

1. **Run troubleshooter**: `npm run troubleshoot`
2. **Share the output** with specific error message
3. **Check MongoDB status**: https://status.mongodb.com
4. **MongoDB Support**: https://support.mongodb.com

---

## ✅ Connection Verification Checklist

- [ ] MongoDB Atlas cluster is **running** (not paused)
- [ ] Your IP is **whitelisted** in Network Access
- [ ] Database **user exists** with correct credentials
- [ ] Connection string is correctly formatted in **.env**
- [ ] Special characters in password are **URL encoded**
- [ ] Database name is specified in URI
- [ ] No **firewall blocking** port 27017
- [ ] `.env` file is in correct directory
- [ ] Restarted terminal after changing `.env`
- [ ] Network connectivity is working

Once all checks pass: ✅ **Your database should connect!**
