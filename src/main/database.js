// src/main/database.js
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { app } = require('electron');

// Ruta segura dentro de la carpeta del sistema del usuario
const dbPath = path.join(app.getPath('userData'), 'events.db');
const db = new sqlite3.Database(dbPath);

// Crear tabla si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      notes TEXT
    )
  `);
});

// Funciones exportadas
function addEvent({ title, date, notes }) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO events (title, date, notes) VALUES (?, ?, ?)`,
      [title, date, notes],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

function getEvents() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM events ORDER BY date ASC`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = { addEvent, getEvents };
