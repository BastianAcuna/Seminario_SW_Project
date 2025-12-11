// Simple Stock model using sqlite3 (shares products.db)
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./products.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS stocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    branch_id INTEGER NOT NULL,
    amount INTEGER NOT NULL
  )`);
});

const Stock = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM stocks", [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM stocks WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  create: (data) => {
    return new Promise((resolve, reject) => {
      const { product_id, branch_id, amount } = data;
      db.run(
        "INSERT INTO stocks (product_id, branch_id, amount) VALUES (?, ?, ?)",
        [product_id, branch_id, amount],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...data });
        }
      );
    });
  },
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const { product_id, branch_id, amount } = data;
      db.run(
        "UPDATE stocks SET product_id = ?, branch_id = ?, amount = ? WHERE id = ?",
        [product_id, branch_id, amount, id],
        function (err) {
          if (err) reject(err);
          else resolve({ id, ...data });
        }
      );
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM stocks WHERE id = ?", [id], function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  },
};

module.exports = Stock;
