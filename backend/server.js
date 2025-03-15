const express = require("express");
const app = express();
const port = 3000;

// In-memory user store (simple array for demo purposes)
const users = [];

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Spend Savvy API is running");
});

// Login route - checks against registered users
app.post("/login", (req, res) => {
  console.log("requewst")
  const { username, password } = req.body;

  console.log("Login attempt:", username, password);

  // Find the user by username
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.json({ success: false, message: "User not found!" });
  }

  // Check if password matches
  if (user.password === password) {
    return res.json({ success: true, message: "Login successful!" });
  } else {
    return res.json({ success: false, message: "Invalid password!" });
  }
});

// Register route - adds new user to the array
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  console.log("Register attempt:", username, password);

  // Check if username already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Username already exists" });
  }

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing fields" });
  }

  // Save the user
  users.push({ username, password });

  console.log("Registered users:", users);

  res.json({ success: true, message: "Registration successful!" });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
