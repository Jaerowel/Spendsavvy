const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const budgetRoutes = require("./budget");
const goalRoutes = require("./goal");
const transactionRoutes = require("./transaction");

router.use("/auth", authRoutes);
router.use("/budgets", budgetRoutes);
router.use("/goals", goalRoutes);
router.use("/transactions", transactionRoutes);

module.exports = router;