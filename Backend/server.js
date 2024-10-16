// server/server.js
const express = require("express");
const connectDB = require("./config/DB"); // MongoDB connection
const recentlyPlayedRoutes = require("./routes/recentlyPlayed"); // API routes
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // Your frontend's URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true // Include this if you need cookies or authorization headers
}));
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
connectDB();

// Set up API routes
app.use("/api/recently-played", recentlyPlayedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
