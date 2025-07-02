// src/main/ipc.js
const { ipcMain } = require('electron');
const { addEvent, getEvents } = require('./database');

// IPC para insertar evento
ipcMain.handle('event:add', async (e, data) => {
  return await addEvent(data);
});

// IPC para obtener eventos
ipcMain.handle('event:getAll', async () => {
  return await getEvents();
});
