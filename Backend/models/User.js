// server/models/User.js
const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  id: Number,
  title: String,
  datePlayed: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  authId: { type: String, required: true, unique: true }, // Auth0 user ID
  recentlyPlayed: [songSchema], // Array of recently played songs
});

const User = mongoose.model("User", userSchema);
module.exports = User;
