# FlexIRC

[![Version](https://img.shields.io/badge/version-0.0.25-blue.svg)](./package.json)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./package.json)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](./package.json)
[![Language](https://img.shields.io/badge/language-JavaScript-yellow.svg)](./package.json)
[![Desktop](https://img.shields.io/badge/GUI-Electron-9feaf9.svg)](https://electronjs.org)
[![Realtime](https://img.shields.io/badge/realtime-WebSocket-ff6b6b.svg)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

FlexIRC is a configurable IRC-style chat server with a browser client and an Electron desktop launcher. It combines real-time chat, optional server federation, and stronger security controls in one project.

## What it includes

- WebSocket chat with channels, user presence, and message history
- Browser client in `public/index.html`
- Electron desktop control panel in `gui.html`
- Optional federation between servers over WebSockets
- Optional HTTPS/WSS with self-signed certificates
- Optional 2FA, JWT auth flow, and Argon2-based password hashing
- Built-in rate limiting, input sanitization, and security logging

## Current version

- App version: `0.0.25`
- License: `MIT`
- Main server entry point: `comprehensive-server.js`
- Desktop app entry point: `main.js`

## Quick start

### Prerequisites

- Node.js
- npm

### Install

```bash
npm install
```

### Run the server

```bash
npm start
```

Default access URLs:

- HTTP: `http://localhost:3000`
- HTTPS: `https://localhost:3443` when `ENABLE_SSL=true`

### Run the desktop app

```bash
npm run electron
```

The Electron app lets you:

- start and stop the server
- save `.env` configuration values
- open the local chat in your browser
- manage federation and SSL toggles from a simple GUI

## Available scripts

| Script | What it does |
|--------|---------------|
| `npm start` | Starts the main server |
| `npm run dev` | Starts the server with `nodemon` |
| `npm run basic` | Disables federation and ultra security |
| `npm run federated` | Keeps federation enabled, disables ultra security |
| `npm run ultra-secure` | Keeps ultra security enabled, disables federation |
| `npm run full-features` | Starts the same main server with all defaults |
| `npm run electron` | Opens the Electron desktop app |
| `npm run electron-dev` | Runs Electron through `nodemon` |
| `npm run build` | Builds distributables with `electron-builder` |
| `npm run build-win` | Builds the Windows installer/app package |
| `npm run build-all` | Builds Windows, macOS, and Linux packages |
| `npm run dist` | Alias for `npm run build-win` |
| `npm run pack` | Builds an unpacked Electron directory |
| `npm run installer` | Alias for `npm run build-win` |

## Configuration

FlexIRC reads settings from environment variables or a local `.env` file.

Example:

```bash
PORT=3000
HTTPS_PORT=3443
SERVER_NAME=my-irc-server
ENABLE_FEDERATION=true
ENABLE_ULTRA_SECURITY=true
ENABLE_SSL=false
ENABLE_2FA=true
USE_ARGON2=true
FEDERATION_PORT=3001
KNOWN_SERVERS=
ADMIN_USERS=admin
```

Notes:

- The Electron app defaults `ENABLE_SSL` to `false` in its generated config.
- The server code treats omitted feature flags as enabled unless explicitly set to `false`.
- `KNOWN_SERVERS` should contain comma-separated `host:port` entries.

## Modes

### Basic

```bash
npm run basic
```

- federation disabled
- ultra security disabled

### Federated

```bash
npm run federated
```

- federation enabled
- ultra security disabled

### Ultra-secure

```bash
npm run ultra-secure
```

- federation disabled
- ultra security enabled

### Default / full features

```bash
npm start
```

- federation enabled unless `ENABLE_FEDERATION=false`
- ultra security enabled unless `ENABLE_ULTRA_SECURITY=false`
- SSL enabled unless `ENABLE_SSL=false` in the server environment

## API endpoints

- `GET /health` returns server status and active feature flags
- `GET /federation/status` returns federation status when federation is enabled

## Security features

- `helmet`, `hpp`, `cors`, and input validation middleware
- rate limiting for connections, messages, commands, and auth attempts
- bcrypt or Argon2 password hashing
- optional JWT auth and TOTP-based 2FA
- self-signed certificate generation for local HTTPS/WSS
- chat and security log files in `logs/`

## Project structure

```text
IRC-chat/
|-- comprehensive-server.js
|-- main.js
|-- gui.html
|-- public/
|   |-- index.html
|-- ssl/
|-- logs/
|-- package.json
|-- package-lock.json
|-- README.md
|-- VERSION_UPDATES.md
|-- COMPREHENSIVE-GUIDE.md
|-- INSTALLER-README.md
```

## Packaging

To build the Windows package:

```bash
npm run build-win
```

The Electron build is configured with:

- product name `FlexIRC`
- app id `com.bubbles.flexirc`
- Windows NSIS installer output in `dist/`

## Related docs

- [GitHub Releases](https://github.com/FNBUBBLES420-ORG/FlexIRC/releases)
- [VERSION_UPDATES.md](./VERSION_UPDATES.md)
- [COMPREHENSIVE-GUIDE.md](./COMPREHENSIVE-GUIDE.md)
- [INSTALLER-README.md](./INSTALLER-README.md)
- [FEDERATED-README.md](./FEDERATED-README.md)

## Known gaps

- The codebase still contains a few older hardcoded strings such as `FlexIRC v1.0` in the Electron About dialog.
- There is currently no `npm test` script in `package.json`.

## License

MIT
