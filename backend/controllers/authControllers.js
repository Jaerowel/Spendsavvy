const User = require("../models/Users");

// @desc    Login user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }

    // Compare passwords (HASHING SOON!)
    if (user.password !== password) {
      return res.json({ success: false, message: "Invalid password!" });
    }

    // SUCCESSFUL LOGIN
    return res.json({ success: true, message: "Login successful!" });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Register user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Register attempt:", email);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Create user (HASHING SOON!)
    const newUser = new User({ email, password });
    await newUser.save();

    return res.json({ success: true, message: "Registration successful!" });

  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { loginUser, registerUser };
