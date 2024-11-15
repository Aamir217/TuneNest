import React, { useState, useEffect } from "react";
import "./Library.css";
import { addRecentlyPlayed } from '../api/recentlyPlayed';
import axios from 'axios';

function Library({
  selectedSongs,
  setSelectedSongs,
  isLiked,
  setLiked,
  likeSongs,
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
  setFilteredSongs,
}) {
  const playlistMap = {
    '459633': 'Atif Aslam',
    '485956': 'Yo Yo Honey Singh',
    '788130': 'B Praak',
    '459320': 'Arijit Singh',
    '464932': 'Neha Kakkar',
    '455130': 'Shreya Ghoshal',
    '468245': 'Diljit Dosanjh',
    '712878': 'Guru Randhawa',
    '3319750': 'Sidhu Moose Wala',
    '455125' : 'Sonu Nigam',
};

  const playlistIds = Object.keys(playlistMap);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchSingers = async () => {
      try {
        
        const shuffledIds = playlistIds.sort(() => 0.5 - Math.random()).slice(0, 4);

        //Fetch songs for the selected playlist IDs
        const songsPromises = shuffledIds.map(id =>
          axios.get(`https://saavn.dev/api/artists/${id}/songs`)
        );
        const singerResponses = await Promise.all(songsPromises);
       
        // Create an array of objects containing singer name and their songs
        const songsData = shuffledIds.map((id, index) => ({
          singer: playlistMap[id],
          songs: singerResponses[index].data.data.songs || [],
        }));

       setSelectedSongs(songsData);
      } catch (error) {
        console.error("Error fetching new releases:", error);
      }finally{
        setIsLoading(false);
      }
    };

    fetchSingers();
  }, []);

  const handleAddSong = async (song) => {
    const artistNames = song.artists.all.map(artist => artist.name);
    const updatedSongs = await addRecentlyPlayed(user.sub, song.id, song.name, artistNames, song.downloadUrl[song.downloadUrl.length-1].url, song.image[song.image.length-1].url);
    setRecentSongs(updatedSongs); // Update the state with new song list
  };

  const [visibleSongs, setVisibleSongs] = useState(8); // Initially display a limited number

  const handleShowMore = () => {
    setVisibleSongs(prev => prev + 2); // Load more songs in increments
  };

  const handleStart = (song) => {
    setCurrentSong(song);
    setPausedTime(0);
    handleAddSong(song);
    
    // Handle like state
    //setLiked(likeSongs.some(p => p.id === song.id));

    if (audioRef.current) {
      audioRef.current.src = song.downloadUrl[song.downloadUrl.length-1].url;
      audioRef.current.currentTime = 0;
      console.log(audioRef);

      audioRef.current.addEventListener("canplay", () => {
        console.log(audioRef);
        audioRef.current.play();
        setIsPlaying(true);
        setProgress(0); // Reset progress for the new song
      }, { once: true });
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="search-songs songs song-list">
        <div className="search">
        {filteredSongs.length > 0 && filteredSongs.map((song) => (
          <div key={song.id} className="song-card">
            <div className="song-info">
              <h3>{song.name}</h3>
              <img src={song.image[2].url} alt={song.name} />
              <button onClick={() => handleStart(song)}>Play</button>
            </div>
          </div>
        ))}
        </div>

         <h2>{selectedSongs[0].singer}</h2>
        <div className="song-gallery">
          {selectedSongs[0].songs.slice(0, visibleSongs).map((album) => (
            <div key={album.id} className="song-card">
              <div className="song-info">
                <h3>{album.name}</h3>
                <img src={album.image[2].url} alt={album.name} />
                <button onClick={() => handleStart(album)}>Play</button>
              </div>
            </div>
          ))}
          {visibleSongs < selectedSongs[0].songs.length && (
            <button onClick={handleShowMore} className="show-more-btn">Show More</button>
          )}
        </div>
        <h2>{selectedSongs[1].singer}</h2>
        <div className="song-gallery">
          {selectedSongs[1].songs.slice(0, visibleSongs).map((album) => (
            <div key={album.id} className="song-card">
              <div className="song-info">
                <h3>{album.name}</h3>
                <img src={album.image[2].url} alt={album.name} />
                <button onClick={() => handleStart(album)}>Play</button>
              </div>
            </div>
          ))}
          {visibleSongs < selectedSongs[1].songs.length && (
            <button onClick={handleShowMore} className="show-more-btn">Show More</button>
          )}
        </div>
        <h2>{selectedSongs[2].singer}</h2>
        <div className="song-gallery">
          {selectedSongs[2].songs.slice(0, visibleSongs).map((album) => (
            <div key={album.id} className="song-card">
              <div className="song-info">
                <h3>{album.name}</h3>
                <img src={album.image[2].url} alt={album.name} />
                <button onClick={() => handleStart(album)}>Play</button>
              </div>
            </div>
          ))}
          {visibleSongs < selectedSongs[2].songs.length && (
            <button onClick={handleShowMore} className="show-more-btn">Show More</button>
          )}
        </div>
        <h2>{selectedSongs[3].singer}</h2>
        <div className="song-gallery">
          {selectedSongs[3].songs.slice(0, visibleSongs).map((album) => (
            <div key={album.id} className="song-card">
              <div className="song-info">
                <h3>{album.name}</h3>
                <img src={album.image[2].url} alt={album.name} />
                <button onClick={() => handleStart(album)}>Play</button>
              </div>
            </div>
          ))}
          {visibleSongs < selectedSongs[3].songs.length && (
            <button onClick={handleShowMore} className="show-more-btn">Show More</button>
          )}
        </div> 
      </div>
      <div className="last-div"></div>
    </div>
  );
}

export default Library;