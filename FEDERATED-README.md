# 🌐 Federated IRC Chat System

A distributed, secure IRC chat system where multiple servers can connect to form a federated network, allowing users on different servers to communicate with each other.

## 🎯 How It Works

### Traditional IRC (Single Server):
```
[User 1] → [Your Server] ← [User 2]
                ↓
            Only these 2 users can chat
```

### Federated IRC (Multiple Connected Servers):
```
[User A] → [Server 1] ←→ [Server 2] ← [User B]
              ↕              ↕
          [Server 3]    [Server 4]
              ↓              ↓
           [User C]       [User D]
           
All 4 users can chat together across servers!
```

## 🚀 Setup Instructions

### 1. **Download & Install**
Each person who wants to host a server:
```bash
# Clone or download this IRC-chat folder
npm install
```

### 2. **Configure Your Server**
Edit `.env.federated` file:
```bash
# Your server's unique name
SERVER_NAME=alice-server

# Ports (change if needed)
PORT=3000
FEDERATION_PORT=3001

# Other servers to connect to (add your friends' IP addresses)
KNOWN_SERVERS=192.168.1.100:3001,203.0.113.50:3001
```

### 3. **Start Your Server**

**Windows:**
```bash
start-federated.bat
```

**Linux/Mac:**
```bash
chmod +x start-federated.sh
./start-federated.sh
```

**Or manually:**
```bash
npm run federated
```

### 4. **Connect & Chat**
- Open web browser: `http://localhost:3000`
- Register/login with username
- Join channels and start chatting!
- Messages will be shared across all connected servers

## 🔧 Network Configuration

### **Same WiFi Network (Easiest)**
```bash
# Find your IP address
# Windows: ipconfig
# Linux/Mac: ifconfig or ip addr

# Example: Your computer is 192.168.1.100
# Friend's computer is 192.168.1.101

# Your .env.federated:
KNOWN_SERVERS=192.168.1.101:3001

# Friend's .env.federated:
KNOWN_SERVERS=192.168.1.100:3001
```

### **Internet (Advanced - Requires Port Forwarding)**
1. **Port Forward** ports 3000 and 3001 on your router
2. **Find Public IP**: Visit whatismyip.com
3. **Share IP**: Give your public IP to friends
4. **Configure**: Add public IPs to KNOWN_SERVERS

```bash
# Example configuration for internet
KNOWN_SERVERS=203.0.113.50:3001,198.51.100.25:3001
```

## 🎮 Available Commands

Type these in the chat (they start with `/`):

| Command | Description | Example |
|---------|-------------|---------|
| `/list` | Show all channels | `/list` |
| `/users <channel>` | Show users in channel | `/users #general` |
| `/servers` | Show connected servers | `/servers` |
| `/connect <address>` | Connect to new server | `/connect 192.168.1.102:3001` |

**Admin only:**
| Command | Description | Example |
|---------|-------------|---------|
| `/kick <user> [reason]` | Kick user | `/kick spammer being annoying` |
| `/ban <user>` | Ban user by IP | `/ban spammer` |

## 🔍 How Messages Work

### **Local Message:**
```
[Alice@server1]: Hello everyone!
```

### **Federated Message:**
```
[Bob@server2]: Hi Alice! (shows orange username + server badge)
```

### **System Messages:**
- Server connections/disconnections
- User joins/leaves across servers
- Federation status updates

## 🛠️ Advanced Configuration

### **Multiple Servers on Same Computer**
```bash
# Server 1
PORT=3000
FEDERATION_PORT=3001
SERVER_NAME=server1

# Server 2  
PORT=4000
FEDERATION_PORT=4001
SERVER_NAME=server2
KNOWN_SERVERS=localhost:3001
```

### **Custom Server Names**
Choose descriptive names:
```bash
SERVER_NAME=alice-home-server
SERVER_NAME=school-computer-lab
SERVER_NAME=office-chat-server
```

### **Security Settings**
```bash
# Limit who can connect to your web interface
ALLOWED_ORIGINS=http://localhost:3000,http://192.168.1.100:3000

# Admin users (can kick/ban)
ADMIN_USERS=alice,moderator,admin
```

## 🔒 Security Features

- ✅ **Input Sanitization** - All messages sanitized against XSS
- ✅ **Rate Limiting** - Prevents spam and flooding
- ✅ **Authentication** - Secure login for each server
- ✅ **IP Banning** - Admins can ban troublemakers
- ✅ **Logging** - All activity logged for security
- ✅ **Validation** - Strict validation of all data

## 📊 Federation Status

### **Connection Status:**
- ✅ **Connected**: Green - Server is connected and federated
- ⚠️ **Partial**: Yellow - Some servers connected, some failed  
- ❌ **Isolated**: Red - No federation connections

### **Troubleshooting:**
```bash
# Check if federation server is running
netstat -an | grep :3001

# Test connection to another server
telnet 192.168.1.101 3001

# Check logs
tail -f logs/security.log
```

## 🎯 Example Setup: 3 Friends

### **Alice (192.168.1.100):**
```bash
SERVER_NAME=alice-server
KNOWN_SERVERS=192.168.1.101:3001,192.168.1.102:3001
```

### **Bob (192.168.1.101):**
```bash
SERVER_NAME=bob-server  
KNOWN_SERVERS=192.168.1.100:3001,192.168.1.102:3001
```

### **Carol (192.168.1.102):**
```bash
SERVER_NAME=carol-server
KNOWN_SERVERS=192.168.1.100:3001,192.168.1.101:3001
```

**Result:** All three can chat together! Messages sent on any server appear on all servers.

## 🚨 Common Issues

### **"Connection Refused"**
- Check if federation port (3001) is open
- Verify IP addresses are correct
- Ensure all servers are started

### **"Can't See Messages from Other Servers"**
- Check `/servers` command to see connections
- Verify KNOWN_SERVERS configuration
- Check firewall settings

### **"Authentication Failed"**  
- Each server has its own user database
- Register on each server you connect to
- Use consistent usernames across servers

## 🌟 Cool Features

1. **Auto-Discovery**: Servers automatically connect to configured peers
2. **Message Relay**: Chat messages broadcast across entire network
3. **User Presence**: See when users join/leave from other servers
4. **Channel Sync**: Same channels work across all servers
5. **Admin Federation**: Admin commands work on local server only
6. **Graceful Failover**: If one server goes down, others keep working

## 📝 License

MIT License - Build your own IRC federation!

---

**🎉 Enjoy your federated chat network!** Now everyone can run their own server and still chat together. Perfect for gaming groups, study groups, or friends who want their own distributed chat system!