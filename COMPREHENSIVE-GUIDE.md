# 🚀 Comprehensive IRC Server - Configuration Guide

## Overview

The comprehensive server combines all IRC features into a single, configurable server file. You can enable/disable features using environment variables or the configuration options.

## Available Feature Sets

### 1. 🔒 **Basic Secure IRC** (Lightweight Mode)
```bash
npm run basic
```
- Basic authentication & user management
- Input sanitization & validation  
- Rate limiting & IP banning
- Channel management & admin commands
- Security logging

### 2. 🌐 **Federated IRC** (Multi-Server Network)
```bash  
npm run federated
```
- All basic features +
- Server-to-server communication
- Cross-server message broadcasting
- Distributed user presence
- Federation API endpoints

### 3. 🛡️ **Ultra-Secure IRC** (Maximum Security)
```bash
npm run ultra-secure
```
- All basic features +
- RSA-2048 + AES-256 encryption
- JWT authentication with 2FA support
- HTTPS/WSS with self-signed certificates
- Argon2 password hashing
- Advanced rate limiting & monitoring
- CSRF protection & security headers

### 4. ⚡ **Full-Featured IRC** (Everything Enabled)
```bash
npm start
# or
npm run full-features
```
- ALL features enabled
- Federation + Ultra Security + SSL + 2FA
- Complete network of ultra-secure servers

## Environment Configuration

Create a `.env` file to customize server behavior:

```bash
# Server Configuration
PORT=3000                              # HTTP port
HTTPS_PORT=3443                        # HTTPS port (if SSL enabled)
SERVER_NAME=my-irc-server             # Server identifier for federation

# Security Features (true/false)
ENABLE_FEDERATION=true                 # Enable server-to-server communication
ENABLE_ULTRA_SECURITY=true            # Enable encryption & advanced security
ENABLE_SSL=true                       # Enable HTTPS/WSS
ENABLE_2FA=true                       # Enable two-factor authentication  
USE_ARGON2=true                       # Use Argon2 vs bcrypt for passwords

# Federation Settings
FEDERATION_PORT=3001                   # Port for server-to-server communication
KNOWN_SERVERS=server1:3001,server2:3001  # Auto-connect to these servers

# Security Settings
ALLOWED_ORIGINS=http://localhost:3000,https://localhost:3000
NODE_ENV=development                   # Set to 'production' for stricter security
```

## Quick Start Examples

### Simple Chat Server
```bash
# For basic local chat
ENABLE_FEDERATION=false ENABLE_ULTRA_SECURITY=false npm start
```

### Multi-Server Network  
```bash
# Server 1
SERVER_NAME=hub-server PORT=3000 FEDERATION_PORT=3001 npm start

# Server 2  
SERVER_NAME=branch-server PORT=3002 FEDERATION_PORT=3003 KNOWN_SERVERS=localhost:3001 npm start
```

### Ultra-Secure Single Server
```bash
# Maximum security, no federation
ENABLE_FEDERATION=false npm start
```

## Available Scripts

| Script | Description | Features Enabled |
|--------|-------------|------------------|
| `npm start` | Full-featured server | All features |
| `npm run basic` | Lightweight mode | Basic IRC only |
| `npm run federated` | Network mode | Basic + Federation |
| `npm run ultra-secure` | Security mode | Basic + Ultra Security |
| `npm run dev` | Development with auto-reload | All features |
| `npm test` | Test basic functionality | - |
| `npm run test-federated` | Test federation | - |

## Feature Comparison

| Feature | Basic | Federated | Ultra-Secure | Full |
|---------|-------|-----------|--------------|------|
| User Authentication | ✅ | ✅ | ✅ | ✅ |
| Channel Management | ✅ | ✅ | ✅ | ✅ |
| Rate Limiting | ✅ | ✅ | ✅✅ | ✅✅ |
| Input Sanitization | ✅ | ✅ | ✅ | ✅ |
| Admin Commands | ✅ | ✅ | ✅ | ✅ |
| Server Federation | ❌ | ✅ | ❌ | ✅ |
| RSA/AES Encryption | ❌ | ❌ | ✅ | ✅ |
| JWT Authentication | ❌ | ❌ | ✅ | ✅ |
| 2FA Support | ❌ | ❌ | ✅ | ✅ |
| HTTPS/WSS | ❌ | ❌ | ✅ | ✅ |
| Argon2 Hashing | ❌ | ❌ | ✅ | ✅ |
| Security Monitoring | ❌ | ❌ | ✅ | ✅ |

## Ports Used

- **3000**: HTTP web client (configurable with PORT)
- **3001**: Federation communication (configurable with FEDERATION_PORT)
- **3443**: HTTPS web client (configurable with HTTPS_PORT)

## Security Certificates

The server automatically generates fresh self-signed SSL certificates in the `ssl/` directory when first started with HTTPS mode enabled. Each installation gets unique certificates for security. For production, replace these with proper certificates from a trusted CA.

## Logs

All server modes create logs in the `logs/` directory:
- `security.log`: Authentication, admin actions, security events
- `chat.log`: Chat messages and user activity

## Windows Installer Preparation

After testing, you can prepare for a Windows installer by:

1. **Test your configuration**:
   ```bash
   npm test
   npm run test-federated
   ```

2. **Choose your deployment mode** (basic/federated/ultra-secure/full)

3. **Bundle with pkg or electron** for distribution

4. **Include SSL certificates** if using HTTPS mode

5. **Create installer with tools like**:
   - Inno Setup
   - NSIS
   - Advanced Installer
   - Wix Toolset

The comprehensive server is designed to be easily deployable as a single executable with your chosen feature set.