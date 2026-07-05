const { spawn } = require('child_process');
const electronBinary = require('electron');
const path = require('path');

const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;
const appRoot = path.resolve(__dirname, '..');

const child = spawn(electronBinary, [
    '--disable-gpu',
    '--disable-gpu-compositing',
    '--in-process-gpu',
    '--use-angle=swiftshader',
    '.'
], {
    cwd: appRoot,
    stdio: 'inherit',
    env,
    windowsHide: false
});

child.on('exit', (code, signal) => {
    if (signal) {
        process.kill(process.pid, signal);
        return;
    }

    process.exit(code ?? 0);
});
