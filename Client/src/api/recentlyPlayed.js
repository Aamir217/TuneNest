// src/api/recentlyPlayed.js
import axios from 'axios';

const API_URL = "http://localhost:5000/api/recently-played";

// Function to get recently played songs for a user
export const getRecentlyPlayed = async (userId) => {
  try {
    const response = await axios.get(API_URL, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error("Error fetching recently played songs:", error);
    return [];
  }
};

// Function to add a song to the recently played list
export const addRecentlyPlayed = async (userId, song) => {
  try {
    const response = await axios.post(API_URL, {params:{ userId, song }});
    return response.data;
  } catch (error) {
    console.error("Error adding song to recently played:", error);
    return [];
  }
};
