// server/routes/recentlyPlayed.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to add a song to the recently played list
router.post("/", async (req, res) => {
  const obj={
    id:req.body.params.id,
    title:req.body.params.song,
    artist:req.body.params.artists,
    source:req.body.params.source,
    image:req.body.params.image,
    date: new Date(),
  }
  try {
    const user = await User.findOne({authId: req.body.params.userId});

    if(user)
    {
      const songIndex = user.recentlyPlayed.findIndex(song => song.id === obj.id);
      if(songIndex !==-1)
      {
        user.recentlyPlayed.splice(songIndex,1);
      }
      user.recentlyPlayed.unshift(obj);

      if(user.recentlyPlayed.length>7)
      {
        user.recentlyPlayed = user.recentlyPlayed.slice(0,7);
      }
      await user.save();
      res.status(200).json(user.recentlyPlayed);
    }
    else
    {
      const newUser = new User({
        authId: req.body.params.userId,
        recentlyPlayed: [obj],
        likedSongs: [],
      });
      await newUser.save();
      res.status(201).json(newUser.recentlyPlayed);
    }
    
  } catch (error) {
    console.error("Error adding recently played song:", error);
    res.status(500).send("Failed to add recently played song.");
  }
});


// Route to get the list of recently played and liked songs
router.get("/", async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findOne({ authId: userId });
    if(!user){
      return res.status(200).json({
        recentlyPlayed:[],
        likedSongs:[],
      });
    }
    res.status(200).json({
      recentlyPlayed: user.recentlyPlayed || [],
      likedSongs: user.likedSongs || [],
    });
  } catch (error) {
    console.error("Error retrieving recently played songs:", error);
    res.status(500).send("Failed to retrieve recently played songs.");
  }
});

module.exports = router;
