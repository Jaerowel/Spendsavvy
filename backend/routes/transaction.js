const express = require("express");
const router = express.Router();
const { createTransaction, getTransactions } = require("../controllers/transactionController");
const authenticateToken = require("../middleware/authMiddleware");

// Create a new transaction
router.post("/", authenticateToken, createTransaction);

// Get all transactions for the authenticated user
router.get("/", authenticateToken, getTransactions);

module.exports = router;