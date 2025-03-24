const express = require("express");
const router = express.Router();
const { createBudget, getBudgets } = require("../controllers/budgetController");

router.post("/", createBudget);
router.get("/:userId", getBudgets);

module.exports = router;