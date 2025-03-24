const Budget = require("../models/Budget");

const createBudget = async (req, res) => {
  const { userId, amount, category } = req.body;

  try {
    const newBudget = new Budget({ userId, amount, category });
    await newBudget.save();

    res.json({ success: true, message: "Budget created successfully!", budget: newBudget });
  } catch (err) {
    console.error("Create Budget Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getBudgets = async (req, res) => {
  const { userId } = req.params;

  try {
    const budgets = await Budget.find({ userId });
    res.json({ success: true, budgets });
  } catch (err) {
    console.error("Get Budgets Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createBudget,
  getBudgets
};