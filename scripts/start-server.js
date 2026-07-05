const { spawn } = require('child_process');
const path = require('path');
const net = require('net');

const serverPath = path.resolve(__dirname, '..', 'comprehensive-server.js');
const preferredPort = parseInt(process.env.PORT || '3000', 10);

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

async function findPort(startPort) {
    let port = startPort;

    while (!(await isPortAvailable(port))) {
        port += 1;
    }

    return port;
}

async function main() {
    const port = await findPort(preferredPort);
    const env = {
        ...process.env,
        PORT: String(port)
    };

    if (port !== preferredPort) {
        console.log(`Port ${preferredPort} is busy. Starting FlexIRC on http://localhost:${port} instead.`);
    }

    const serverProcess = spawn(process.execPath, [serverPath], {
        cwd: path.resolve(__dirname, '..'),
        stdio: 'inherit',
        env,
        windowsHide: false
    });

    let browserOpened = false;

    function openBrowser() {
        if (browserOpened) {
            return;
        }

        browserOpened = true;
        spawn('cmd', ['/c', 'start', '', `http://localhost:${port}`], {
            detached: true,
            stdio: 'ignore',
            windowsHide: true
        }).unref();
    }

    setTimeout(openBrowser, 1500);

    serverProcess.on('exit', (code, signal) => {
        if (signal) {
            process.kill(process.pid, signal);
            return;
        }

        process.exit(code ?? 0);
    });

    process.on('SIGINT', () => {
        serverProcess.kill('SIGINT');
    });

    process.on('SIGTERM', () => {
        serverProcess.kill('SIGTERM');
    });
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
