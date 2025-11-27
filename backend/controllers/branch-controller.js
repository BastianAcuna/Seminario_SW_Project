const Branch = require("../models/branch");

exports.getAllBranches = async (req, res) => {
  try {
    const rows = await Branch.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBranchById = async (req, res) => {
  try {
    const row = await Branch.getById(req.params.id);
    if (!row) return res.status(404).json({ error: "Branch not found" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.status(201).json(branch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBranch = async (req, res) => {
  try {
    const branch = await Branch.update(req.params.id, req.body);
    res.json(branch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBranch = async (req, res) => {
  try {
    await Branch.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
