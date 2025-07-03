const { ipcMain } = require('electron');
const { addEvent, getEvents, updateEvent } = require('./database');

ipcMain.handle('event:update', async (event, data) => {
  return await updateEvent(data);
});

// IPC para insertar evento
ipcMain.handle('event:add', async (e, data) => {
  return await addEvent(data);
});

// IPC para obtener eventos
ipcMain.handle('event:getAll', async () => {
  return await getEvents();
});
