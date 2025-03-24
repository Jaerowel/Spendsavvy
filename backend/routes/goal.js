const express = require("express");
const router = express.Router();
const { createGoal, getGoals } = require("../controllers/goalController");

router.post("/", createGoal);
router.get("/:userId", getGoals);

module.exports = router;