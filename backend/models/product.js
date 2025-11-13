// Simple Product model using sqlite3
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./products.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		price REAL NOT NULL,
		description TEXT
	)`);
});

const Product = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  create: (data) => {
    return new Promise((resolve, reject) => {
      const { name, price, description } = data;
      db.run(
        "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
        [name, price, description],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...data });
        }
      );
    });
  },
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const { name, price, description } = data;
      db.run(
        "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?",
        [name, price, description, id],
        function (err) {
          if (err) reject(err);
          else resolve({ id, ...data });
        }
      );
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  },
};

module.exports = Product;
