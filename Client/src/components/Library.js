import React, { useState } from "react";
import "./Library.css";
import { addRecentlyPlayed } from '../api/recentlyPlayed';

function Library({
  user,
  setRecentSongs,
  audioRef,
  setIsPlaying,
  setProgress,
  setPausedTime,
  setCurrentSong,
  songs,
  searchTerm,
  filteredSongs,
}) {
  const handleAddSong = async (song) => {
    const updatedSongs = await addRecentlyPlayed(user.sub, song.title);
    setRecentSongs(updatedSongs); // Update the state with new song list
  };
  const [visibleSongs, setVisibleSongs] = useState(8); // Initially display a limited number

  const handleShowMore = () => {
    setVisibleSongs((prev) => prev + 2); // Load more songs in increments
  };

  const handleStart = (song) => {
    setCurrentSong(song);
    setPausedTime(0);
    handleAddSong(song);
    
    if (audioRef.current) {
      audioRef.current.src = song.src;
      audioRef.current.currentTime = 0;

      // Wait for the audio to be ready before playing
      audioRef.current.addEventListener(
        "canplay",
        () => {
          audioRef.current.play();
          setIsPlaying(true);
          setProgress(0); // Reset progress for the new song
        },
        { once: true }
      ); // Use { once: true } to ensure the event listener is removed after the first trigger
    }
  };

  return (
    <div>
      <div className="search-songs songs song-list">
        {filteredSongs.length > 0 &&
          filteredSongs.map((song) => (
            <div key={song.id} className="song-card">
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
                <img src={song.albumCover} alt={song.title}/>
                <button onClick={() => handleStart(song)}>Play</button>
              </div>
            </div>
          ))}
        <h2>Recommended Songs</h2>
          <div className="song-gallery">
            {songs.slice(0, visibleSongs).map((song) => (
              <div key={song.id} className="song-card">
                <div className="song-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                  <img src={song.albumCover} alt={song.title}/>
                  <button onClick={() => handleStart(song)}>Play</button>
                </div>
              </div>
            ))}
            {visibleSongs < songs.length && (
            <button onClick={handleShowMore} className="show-more-btn">
              Show More
            </button>
          )}
          </div>
        <div className="main-block">
          <section className="song-list">
            <h2>Popular Songs</h2>
            <div className="songs">
              {songs.map((song) => (
                <div key={song.id} className="song-card">
                  <div className="song-info">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                    <img src={song.albumCover} alt={song.title}/>
                    <button onClick={() => handleStart(song)}>Play</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="last-div"></div>
    </div>
  );
}
export default Library;
