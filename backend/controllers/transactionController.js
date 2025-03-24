const Transaction = require("../models/Transaction");

const createTransaction = async (req, res) => {
  const { userId, amount, category, date } = req.body;

  try {
    const newTransaction = new Transaction({ userId, amount, category, date });
    await newTransaction.save();

    res.json({ success: true, message: "Transaction created successfully!", transaction: newTransaction });
  } catch (err) {
    console.error("Create Transaction Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getTransactions = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transaction.find({ userId });
    res.json({ success: true, transactions });
  } catch (err) {
    console.error("Get Transactions Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createTransaction,
  getTransactions
};