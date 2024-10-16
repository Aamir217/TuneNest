// server/routes/recentlyPlayed.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to add a song to the recently played list
router.post("/", async (req, res) => {
  const { userId, song } = req.body;
  
  try {
    
    const user = await User.findOneAndUpdate(
      { authId: userId },
      {
        $push: {
          recentlyPlayed: {
            $each: [song],
            $position: 0,
            $slice: 5, // Keep only the 5 most recent songs
          },
        },
      },
      { new: true, upsert: true } // Create document if it doesn't exist
    );
    res.status(200).json(user.recentlyPlayed);
  } catch (error) {
    console.error("Error adding recently played song:", error);
    res.status(500).send("Failed to add recently played song.");
  }
});

// Route to get the list of recently played songs
router.get("/", async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findOne({ authId: userId });
    res.status(200).json(user ? user.recentlyPlayed : []);
  } catch (error) {
    console.error("Error retrieving recently played songs:", error);
    res.status(500).send("Failed to retrieve recently played songs.");
  }
});

module.exports = router;
