const Stock = require("../models/stock");

exports.getAllStocks = async (req, res) => {
  try {
    const rows = await Stock.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStockById = async (req, res) => {
  try {
    const row = await Stock.getById(req.params.id);
    if (!row) return res.status(404).json({ error: "Stock not found" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStock = async (req, res) => {
  try {
    const stock = await Stock.create(req.body);
    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const stock = await Stock.update(req.params.id, req.body);
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    await Stock.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
