const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to add a song to likedsongs List
router.post("/", async (req, res) => {
    const obj={
      id:req.body.params.id,
      title:req.body.params.song,
      artist:req.body.params.artist,
      source:req.body.params.source,
      image:req.body.params.image,
      date: new Date(),
    }
    try {
      const user = await User.findOne({authId: req.body.params.userId});
      console.log(user);
      if(!user)
      {
        const newUser = new User({
          authId: req.body.params.userId,
          recentlyPlayed: [],
          likedSongs: [obj],
        });
        await newUser.save();
        return res.status(201).json(newUser.likedSongs);
      }
      const songExists = user.likedSongs.some(song => song.id === req.body.params.id);
  
      if (songExists) {
        return res.status(201).json({ message: 'Song is already liked.',likedSongs:user.likedSongs });
      }
      user.likedSongs.push(obj);
  
      // Save the updated user document
      await user.save();
  
      res.status(200).json({ message: 'Song added to liked songs.', likedSongs: user.likedSongs });
    }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.delete("/", async (req, res) => {
    const { authId, songId } = req.body.params;

  try {
    let user = await User.findOne({ authId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const songIndex = user.likedSongs.findIndex(song => song.id === songId);
    if (songIndex === -1) {
      return res.status(400).json({ message: 'Song not found in liked songs.' });
    }

    user.likedSongs.splice(songIndex, 1);
    await user.save();

    res.status(200).json({ message: 'Song removed from liked songs.', likedSongs: user.likedSongs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });
  module.exports = router;