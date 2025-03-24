const Goal = require("../models/Goal");

const createGoal = async (req, res) => {
  const { userId, title, targetAmount, deadline } = req.body;

  try {
    const newGoal = new Goal({ userId, title, targetAmount, deadline });
    await newGoal.save();

    res.json({ success: true, message: "Goal created successfully!", goal: newGoal });
  } catch (err) {
    console.error("Create Goal Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getGoals = async (req, res) => {
  const { userId } = req.params;

  try {
    const goals = await Goal.find({ userId });
    res.json({ success: true, goals });
  } catch (err) {
    console.error("Get Goals Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createGoal,
  getGoals
};