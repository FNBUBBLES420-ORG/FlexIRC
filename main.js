const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
const net = require('net');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const runtimeDataPath = path.join(app.getPath('temp'), 'FlexIRC');
fs.mkdirSync(runtimeDataPath, { recursive: true });
app.setPath('userData', runtimeDataPath);
app.setPath('sessionData', path.join(runtimeDataPath, 'session'));
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');

let mainWindow;
let serverProcess = null;
let serverRunning = false;
let currentPort = 3000;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'assets', 'icons8-messaging-100.ico'),
        title: 'FlexIRC'
    });

    mainWindow.loadFile(path.join(__dirname, 'gui.html'));

    // Create application menu
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open Chat in Browser',
                    click: () => {
                        if (serverRunning) {
                            shell.openExternal(`http://localhost:${currentPort}`);
                        }
                    }
                },
                { type: 'separator' },
                { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() }
            ]
        },
        {
            label: 'Server',
            submenu: [
                {
                    label: 'Start Server',
                    click: () => mainWindow.webContents.send('start-server')
                },
                {
                    label: 'Stop Server', 
                    click: () => mainWindow.webContents.send('stop-server')
                }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click: () => {
                        const { dialog } = require('electron');
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'About FlexIRC',
                            message: 'FlexIRC v1.0\nFlexible, secure chat for everyone!',
                            buttons: ['OK']
                        });
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    stopServer();
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC handlers for GUI communication
ipcMain.handle('get-config', () => {
    try {
        const envPath = path.join(__dirname, '.env');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            return parseEnvFile(envContent);
        }
        return getDefaultConfig();
    } catch (error) {
        return getDefaultConfig();
    }
});

ipcMain.handle('save-config', (event, config) => {
    try {
        const envContent = generateEnvFile(config);
        fs.writeFileSync(path.join(__dirname, '.env'), envContent);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('start-server', async () => {
    if (!serverRunning) {
        const config = loadConfig();
        const preferredPort = parseInt(config.PORT || '3000', 10);
        currentPort = await findAvailablePort(preferredPort);

        if (currentPort !== preferredPort) {
            mainWindow.webContents.send('server-log', `Port ${preferredPort} is busy. FlexIRC is using http://localhost:${currentPort} instead.\n`);
        }

        serverProcess = spawn('node', ['comprehensive-server.js'], {
            cwd: __dirname,
            stdio: 'pipe',
            env: {
                ...process.env,
                PORT: String(currentPort),
                ELECTRON_RUN_AS_NODE: undefined
            }
        });

        serverProcess.stdout.on('data', (data) => {
            mainWindow.webContents.send('server-log', data.toString());
        });

        serverProcess.stderr.on('data', (data) => {
            mainWindow.webContents.send('server-error', data.toString());
        });

        serverProcess.on('close', (code) => {
            serverRunning = false;
            mainWindow.webContents.send('server-stopped', code);
        });

        serverRunning = true;
        return { success: true };
    }
    return { success: false, error: 'Server already running' };
});

ipcMain.handle('stop-server', () => {
    return stopServer();
});

ipcMain.handle('open-chat', async () => {
    if (!serverRunning) {
        return { success: false, error: 'Server not running' };
    }

    await shell.openExternal(`http://localhost:${currentPort}`);
    return { success: true };
});

ipcMain.handle('quit-app', async () => {
    stopServer();
    app.quit();
    return { success: true };
});

function stopServer() {
    if (serverProcess) {
        serverProcess.kill();
        serverProcess = null;
        serverRunning = false;
        return { success: true };
    }
    return { success: false, error: 'Server not running' };
}

function loadConfig() {
    try {
        const envPath = path.join(__dirname, '.env');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            return parseEnvFile(envContent);
        }
    } catch (error) {
        // Fall through to defaults
    }

    return getDefaultConfig();
}

function isPortAvailable(port) {
    return new Promise((resolve) => {
        const tester = net.createServer();

        tester.once('error', () => resolve(false));
        tester.once('listening', () => {
            tester.close(() => resolve(true));
        });

        tester.listen(port, '127.0.0.1');
    });
}

async function findAvailablePort(startPort) {
    let port = startPort;

    while (!(await isPortAvailable(port))) {
        port += 1;
    }

    return port;
}

function parseEnvFile(content) {
    const config = {};
    const lines = content.split('\n');
    
    lines.forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                config[key.trim()] = valueParts.join('=').trim();
            }
        }
    });
    
    return config;
}

function generateEnvFile(config) {
    let content = '# FlexIRC Configuration\n\n';
    
    Object.entries(config).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
            content += `${key}=${value}\n`;
        }
    });
    
    return content;
}

function getDefaultConfig() {
    return {
        PORT: '3000',
        SERVER_NAME: 'my-irc-server',
        ENABLE_FEDERATION: 'true',
        ENABLE_ULTRA_SECURITY: 'true',
        ENABLE_SSL: 'false',
        FEDERATION_PORT: '3001',
        KNOWN_SERVERS: '',
        ADMIN_USERS: 'admin'
    };
}
