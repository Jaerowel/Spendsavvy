const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile"); // <-- New profile route

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // <-- Optional CORS for cross-origin requests
app.use(express.json());

// Routes
app.get("/", (req, res) =>
  res.send("Spend Savvy API is running with MongoDB")
);

app.use("/api/auth", authRoutes); // /api/auth/login , /api/auth/register
app.use("/api/profile", profileRoutes); // /api/profile (protected route)

// Error handler middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
