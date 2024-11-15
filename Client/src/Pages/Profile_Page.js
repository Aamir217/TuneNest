import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile_Page.css";
import { getRecentlyPlayed } from "../api/recentlyPlayed";
import Recommendations from "../components/Recommendations";

function ProfilePage({
  songsMap,
  setSongsMap,
  likeSongs,
  recentSongs,
  user,
  isAuthenticated,
  songs,
  setCurrentSong,
  setPausedTime,
  audioRef,
  setIsPlaying,
  setProgress,
}) {
  const [recommendationSongs,setRecommendationSongs]=useState([]);
  const [isClick, setIsClick] = useState(false);
  const handleRecommendation = async () => {
    setIsClick(true);
    if (isAuthenticated) {
      const songss = await getRecentlyPlayed(user.sub);
      //console.log(songss.songsMap);
      setSongsMap(songss.songsMap);
      const entries = Object.entries(songsMap);

      // Sort the array by play count in descending order
      const sortedEntries = entries.sort((a, b) => b[1] - a[1]);

      // Extract the top N song IDs
      const topSongs = sortedEntries.slice(0, 3).map((entry) => entry[0]);
      const top3Songs = topSongs.map((id) =>
        axios.get(`https://saavn.dev/api/songs/${id}`)
      );
      const singerResponses = await Promise.all(top3Songs);
      const allUniqueArtistsIds = Array.from(
        new Set(
          singerResponses.flatMap((response) =>
            response.data.data[0].artists.all.map((artist) => artist.id)
          )
        )
      );
      const randomArtistsIds = getRandomItems(allUniqueArtistsIds, 3);
      const randomArtistsSongs = randomArtistsIds.map((id) =>
        axios.get(`https://saavn.dev/api/artists/${id}/songs`)
      );
      const RecommendationResponse = await Promise.all(randomArtistsSongs);
      console.log(RecommendationResponse);
      const allSongs = RecommendationResponse.flatMap((response) => 
        response.data.data.songs
      );
      const randomSongs = getRandomItems(allSongs, 10);

      // Log the selected random songs
      console.log(randomSongs);
  
      // Set the random songs to state
      setRecommendationSongs(randomSongs);
    }
  };
  const getRandomItems = (arr, n) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());  // Shuffle the array
    return shuffled.slice(0, n);  // Pick the first 'n' items from the shuffled array
};
  const handleStart = (song) => {
    setCurrentSong(song);
    setPausedTime(0);

    if (audioRef.current) {
      audioRef.current.src = song.source;
      audioRef.current.currentTime = 0;
      console.log(audioRef.current);

      // Wait for the audio to be ready before playing
      audioRef.current.addEventListener(
        "canplay",
        () => {
          console.log(audioRef.current);
          audioRef.current.play();
          setIsPlaying(true);
          setProgress(0); // Reset progress for the new song
        },
        { once: true }
      ); // Use { once: true } to ensure the event listener is removed after the first trigger
    }
  };
  const dummyUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Software developer with a passion for creating impactful solutions. Enjoys hiking and photography.",
    profilePicture: "https://via.placeholder.com/150", // Replace with a real image URL
  };
  return (
    <div>
      <div className="profile-page">
        {isAuthenticated ? (
          <div className="profile-header">
            <img
              src={user.picture}
              alt={`${user.name}'s profile`}
              className="profile-picture"
            />
            <button>Change</button>
            <p className="profile-email">{user.email}</p>
          </div>
        ) : (
          <div className="profile-header">
            <img
              src={dummyUser.profilePicture}
              alt={`${dummyUser.name}'s profile`}
              className="profile-picture"
            />
            <p className="profile-email">{dummyUser.email}</p>
            <h2>Please Login To See Profile.......</h2>
          </div>
        )}
      </div>
      {isAuthenticated && (
        <div>
          {/* <h2>Recommended Songs</h2>
          <div className="song-gallery">
            {recentSongs.map((song) => (
              <div key={song.id} className="song-card">
                <div className="song-info">
                  <h3>{song.title}</h3>
                  <img src={song.image} alt={song.title} />
                  <button onClick={() => handleStart(song)}>Play</button>
                </div>
              </div>
            ))}
          </div> */}
          <button onClick={handleRecommendation}>
            Click For Recommendation
          </button>
          {isClick ? (
            <Recommendations 
              recommendationSongs={recommendationSongs}
            />
          ) : (
            <div></div>
          )}
          <h2>Recently Played Songs</h2>
          <div className="song-gallery">
            {recentSongs.map((song) => (
              <div key={song.id} className="song-card">
                <div className="song-info">
                  <h3>{song.title}</h3>
                  <img src={song.image} alt={song.title} />
                  <button onClick={() => handleStart(song)}>Play</button>
                </div>
              </div>
            ))}
          </div>
          <h2>Liked Songs</h2>
          <div className="song-gallery">
            {likeSongs.map((song) => (
              <div key={song.id} className="song-card">
                <div className="song-info">
                  <h3>{song.title}</h3>
                  <img src={song.image} alt={song.title} />
                  <button onClick={() => handleStart(song)}>Play</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="profile-last-div"></div>
    </div>
  );
}

export default ProfilePage;
