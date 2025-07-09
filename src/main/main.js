const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

require('./ipc'); // 👈 registra los handlers de SQLite

ipcMain.on('focus-window', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) win.focus();
});

// ...existing code...
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../renderer/assets/garrapatas.png'),
    webPreferences: {
      preload: path.join(__dirname, '../renderer/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  win.loadFile(path.join(__dirname, '../renderer/index.html'));
  win.setMenuBarVisibility(false);

  // Atajo para abrir DevTools: Ctrl+Shift+I
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.shift && input.key.toLowerCase() === 'i') {
      win.webContents.openDevTools();
      event.preventDefault();
    }
  });

  win.loadFile(path.join(__dirname, '../renderer/index.html'));
  win.setMenuBarVisibility(false); // Oculta la barra de menú

}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
