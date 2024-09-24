import React, { useState, useRef, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const songs = [
    { id: 1, title: 'Song 1', artist: 'Artist 1', src: '/songs/song1.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 2, title: 'Song 2', artist: 'Artist 2', src: '/songs/song2.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 3, title: 'Song 3', artist: 'Artist 3', src: '/songs/song3.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 4, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
  ];

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [progress, setProgress] = useState(0); // Track progress of the song
  const audioRef = useRef(null);

  // Handle Start Button (Start from Beginning)
  const handleStart = (song) => {
    setCurrentSong(song);
    setPausedTime(0);
    audioRef.current.src = song.src;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
    setProgress(0); // Reset progress for the new song
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
  const handleNext = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setPausedTime(0);
    audioRef.current.src = songs[nextIndex].src;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
    setProgress(0); // Reset progress for the new song
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
            <li><a href="#">Home</a></li>
            <li><a href="#">Search</a></li>
            <li><a href="#">Library</a></li>
            <li><a href="#">Profile</a></li>
        </ul>
        </nav>
      </header>
      <div className='main-block'>
        <aside class="sidebar">
            <h2>Menu</h2>
            <ul>
                <li><a href="#">Link 1</a></li>
                <li><a href="#">Link 2</a></li>
                <li><a href="#">Link 3</a></li>
                <li><a href="#">Link 4</a></li>
            </ul>
        </aside>
        <section className="song-list">
            <h2>Popular Songs</h2>
        <div className="songs">
          {songs.map((song) => (
            <div key={song.id} className="song-card">
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
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
              <button onClick={handlePause}>Pause</button>
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
