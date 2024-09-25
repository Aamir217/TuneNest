import React, { useState, useRef, useEffect } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const songs = [
    { id: 1, title: 'Dil Kya Kare', artist: 'Artist 1', src: '/songs/Dil Kya Kare.mp3', albumCover: './songs/Dil Kya Kare.jpg' },
    { id: 2, title: 'Song 2', artist: 'Artist 2', src: '/songs/song2.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 3, title: 'Song 3', artist: 'Artist 3', src: '/songs/song3.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 4, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 5, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 6, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 7, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 8, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 9, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 10, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 11, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 12, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 13, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 14, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 15, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 16, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
  ];

  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [progress, setProgress] = useState(0); // Track progress of the song
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.src;
      audioRef.current.currentTime = 0;
      // Uncomment the line below if you want to start playing the song automatically
      // audioRef.current.play();
      setIsPlaying(false); // Set to true if auto-play
    }
  }, [currentSong]);
  // Handle Start Button (Start from Beginning)
  const handleStart = (song) => {
    setCurrentSong(song);
    setPausedTime(0);
    
    audioRef.current.src = song.src;
    audioRef.current.currentTime = 0;
  
    // Wait for the audio to be ready before playing
    audioRef.current.addEventListener('canplay', () => {
      audioRef.current.play();
      setIsPlaying(true);
      setProgress(0); // Reset progress for the new song
    }, { once: true }); // Use { once: true } to ensure the event listener is removed after the first trigger
  };

  // Handle Resume Button (Resume from paused time)
  const handleResume = () => {
    if (currentSong) {
      audioRef.current.currentTime = pausedTime; // Resume from where it was paused
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Handle Pause Button
  const handlePause = () => {
    setPausedTime(audioRef.current.currentTime); // Save current time before pausing
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // Handle Next Song Button
  // Handle Next Song Button
const handleNext = () => {
  const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
  const nextIndex = (currentIndex + 1) % songs.length;
  const nextSong = songs[nextIndex];

  // Stop the current song if it's playing
  audioRef.current.pause();

  // Set the new song as the current song
  setCurrentSong(nextSong);
  setPausedTime(0);
  audioRef.current.src = nextSong.src;
  audioRef.current.currentTime = 0;

  // Wait for the new audio to be ready to play
  audioRef.current.addEventListener('canplay', () => {
    audioRef.current.play();
    setIsPlaying(true);
    setProgress(0); // Reset progress for the new song
  }, { once: true }); // Ensure the event fires once and is removed
};


  // Update progress based on current time
  const updateProgress = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 0;
    const progressPercentage = (current / duration) * 100;
    setProgress(progressPercentage);
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    // Add timeupdate event listener
    audioElement.addEventListener('timeupdate', updateProgress);

    return () => {
      // Clean up event listener
      audioElement.removeEventListener('timeupdate', updateProgress);
    };
  }, [audioRef]);

  useEffect(() => {
    const audioElement = audioRef.current;
  
    const handleSongEnd = () => {
      handleNext(); // Move to the next song when the current one ends
    };
  
    audioElement.addEventListener('ended', handleSongEnd);
  
    return () => {
      audioElement.removeEventListener('ended', handleSongEnd);
    };
  }, [currentSong]);
  // Handle progress bar click
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickX = e.clientX - progressBar.getBoundingClientRect().left; // Get click position relative to the bar
    const newWidthPercentage = (clickX / progressBar.clientWidth) * 100; // Calculate new position as percentage

    const newTime = (newWidthPercentage / 100) * audioRef.current.duration; // Convert percentage to time
    audioRef.current.currentTime = newTime; // Seek to the new time
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>TuneNest</h1>
        <nav>
        <ul>
            <li><Link to='/Search'><input type="text" placeholder='Search' /></Link></li>
            <li><a href="#">Home</a></li>
            <li><a href="#">Library</a></li>
            <li><Link to='/Profile'>Profile</Link></li>
        </ul>
        </nav>
      </header>
      <div className='main-block'>
        <section className="song-list">
            <h2>Popular Songs</h2>
        <div className="songs">
          {songs.map((song) => (
            <div key={song.id} className="song-card">
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
                <img src={song.albumCover}/>
                <button onClick={() => handleStart(song)}>Play</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>

      <footer className="music-player">
        {currentSong ? (
          <>
            <h3>Now Playing: {currentSong.title} by {currentSong.artist}</h3>
            <div className="controls">
              <button onClick={isPlaying ? handlePause : handleResume}>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={handleNext}>Next</button>
            </div>
            <div className="progress-bar" onClick={handleProgressClick}>
              <div className="progress" style={{ width: `${progress}%` }} />
            </div>
          </>
        ) : (
          <h3>No song is playing currently</h3>
        )}
        <audio ref={audioRef} controls style={{ display: 'none' }} />
      </footer>
    </div>
  );
};

export default HomePage;
