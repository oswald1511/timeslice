const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'src', 'assets', 'garrapatas.png'), // <-- aquí
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // ⚠️ Esto desactiva el aislamiento, solo si sabés lo que hacés
        },
    });

    win.loadFile('src/index.html');

}

app.whenReady().then(createWindow);
