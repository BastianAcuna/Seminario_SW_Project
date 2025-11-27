// Simple Branch model using sqlite3 (shares products.db)
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./products.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS branches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    description TEXT
  )`);
});

const Branch = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM branches", [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM branches WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  create: (data) => {
    return new Promise((resolve, reject) => {
      const { name, address, description } = data;
      db.run(
        "INSERT INTO branches (name, address, description) VALUES (?, ?, ?)",
        [name, address, description],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...data });
        }
      );
    });
  },
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const { name, address, description } = data;
      db.run(
        "UPDATE branches SET name = ?, address = ?, description = ? WHERE id = ?",
        [name, address, description, id],
        function (err) {
          if (err) reject(err);
          else resolve({ id, ...data });
        }
      );
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM branches WHERE id = ?", [id], function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  },
};

module.exports = Branch;
