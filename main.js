const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Permitir el uso de Node.js en el renderizador
        },
    });

    win.loadFile('src/index.html');
}

app.whenReady().then(createWindow);
