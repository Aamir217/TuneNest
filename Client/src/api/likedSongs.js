import axios from 'axios';

const API_URL = "http://localhost:5000/api/liked-songs";

export const addLikedSongs = async (userId,id,song,artist,source,image) => {
    try {
      const response = await axios.post(API_URL, {params:{ userId,id,song,artist,source,image }});
      return response.data;
    } catch (error) {
      console.error("Error adding song to Liked Songs:", error);
      return [];
    }
  };

export const deleteLikedSongs = async (userId,id) =>{
  try {
    const response = await axios.delete(API_URL, {params:{ userId,id }});
    return response.data;
  } catch (error) {
    console.error("Error deleting song from Liked Songs:", error);
    return [];
  }
};