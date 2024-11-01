// server/models/User.js
const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  id: {type: String, required: true},
  title: {type: String,required: true},
  artist:{type: [String],required: true},
  source: {type: String,required:true},
  image: {type: String,required: true},
  datePlayed: { type: Date, default: Date.now },
},{strict: true});

const userSchema = new mongoose.Schema({
  authId: { type: String, required: true, unique: true }, // Auth0 user ID
  recentlyPlayed: { type: [songSchema], default: [] },
  likedSongs: { type: [songSchema], default: [] }, // Array of recently played songs
});

const User = mongoose.model("User", userSchema);
module.exports = User;
