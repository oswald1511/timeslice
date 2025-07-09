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
      titulo TEXT,
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
    db.all(`SELECT * FROM events ORDER BY fecha ASC`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function updateEvent({titulo, descripcion, fecha }) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE events SET titulo = ?, descripcion = ? WHERE fecha = ?`,
      [titulo, descripcion, fecha],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes); // número de filas modificadas
      }
    );
  });
}

function getEvent({fecha}){
  return new Promise ((resolve, reject) => {
    db.get(
      'SELECT * FROM events WHERE fecha = ?',
      [fecha],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }      
    );
  });
}

module.exports = { addEvent, getEvents, updateEvent, getEvent };