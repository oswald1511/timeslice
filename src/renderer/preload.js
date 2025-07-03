const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getAllEvents: () => ipcRenderer.invoke('event:getAll'),
  addEvent: (data) => ipcRenderer.invoke('event:add', data),
  updateEvent: (data) => ipcRenderer.invoke('event:update', data),
  getEvent: (data) => ipcRenderer.invoke('event:get', data)
});
