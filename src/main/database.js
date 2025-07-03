// src/main/database.js
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { app } = require('electron');

// Ruta segura dentro de la carpeta del sistema del usuario
const dbPath = path.join(__dirname, '../data/events.db');
const db = new sqlite3.Database(dbPath);

// Crear tabla si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      fecha TEXT PRIMARY KEY,
      titulo TEXT NOT NULL,
      descripcion TEXT
    )
  `);
});

// Funciones exportadas
function addEvent({ titulo, fecha, descripcion }) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO events (titulo, fecha, descripcion) VALUES (?, ?, ?)`,
      [titulo, fecha, descripcion],
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

function updateEvent({titulo, fecha, descripcion }) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE events SET titulo = ?, descripcion = ? WHERE fecha = ?`,
      [titulo, fecha, descripcion],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes); // número de filas modificadas
      }
    );
  });
}

module.exports = { addEvent, getEvents, updateEvent };