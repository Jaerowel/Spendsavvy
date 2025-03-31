const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid password!" });
    }

    // Generate a token
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration
    );

    return res.json({ success: true, message: "Login successful!", token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const registerUser = async (req, res) => {
  const { email, password, username } = req.body;
  console.log("Register attempt:", email);

  if (!email || !password || !username) {
    return res.status(400).json({ success: false, message: "Email, username, and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Create user (HASHING SOON!)
    const newUser = new User({ email, password, username });
    await newUser.save();

    return res.json({ success: true, message: "Registration successful!" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user.id
    const user = await User.findById(userId).select('email'); // Fetch user by ID and select only the email field

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, email: user.email });
  } catch (err) {
    console.error("Get User Info Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserInfo
};
