const Transaction = require("../models/Transaction");

const createTransaction = async (req, res) => {
  const { amount, category, date, description, payment_mode } = req.body;

  if (!amount || !category || !date) {
    return res.status(400).json({ success: false, message: "Amount, category, and date are required" });
  }

  try {
    const transaction = new Transaction({
      user_id: req.user.id, // Extracted from the token by authenticateToken middleware
      amount,
      category,
      date,
      description,
      payment_mode,
    });

    await transaction.save();
    res.status(201).json({ success: true, transaction });
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user_id: req.user.id }).sort({ date: -1 }); // Sort by date (most recent first)
    res.json({ success: true, transactions });
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
};