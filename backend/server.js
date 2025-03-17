const express = require("express");
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth");

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Spend Savvy API is running with MongoDB"));
app.use("/api/auth", authRoutes); // /api/auth/login , /api/auth/register

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});
