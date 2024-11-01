import React, { useState } from "react";
import "./Profile_Page.css";

function ProfilePage({
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
  const handleStart = (song) => {
    console.log(song);
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
          <h2>Recently Played Songs</h2>
          <div className="song-gallery">
            {recentSongs.map((song) => (
              <div key={song.id} className="song-card">
                <div className="song-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist.join(', ')}</p>
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
                  <p>{song.artist.join(', ')}</p>
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
