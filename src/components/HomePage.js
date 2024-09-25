import React, { useState, useRef, useEffect } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const songs = [
    { id: 1, title: 'Dil Kya Kare', artist: 'Artist 1', src: '/songs/Dil Kya Kare.mp3', albumCover: './songs/Dil Kya Kare.jpg' },
    { id: 2, title: 'Likhe jo Khat Tujhe', artist: 'Artist 2', src: '/songs/Likhe jo Khat Tujhe.mp3', albumCover: './songs/Likhe jo Khat Tujhe.jpg' },
    { id: 3, title: 'O Mere Dil Ke Chain', artist: 'Artist 3', src: '/songs/O Mere Dil Ke Chain.mp3', albumCover: './songs/O Mere Dil Ke Chain.jpg' },
    { id: 4, title: 'Ye Shaam Mastani', artist: 'Artist 4', src: '/songs/Ye Shaam Mastani.mp3', albumCover: './songs/Ye Shaam Mastani.jpg' },
    { id: 5, title: 'Chatur Naar', artist: 'Artist 4', src: '/songs/Chatur Naar.mp3', albumCover: './songs/Chatur Naar.jpeg' },
    { id: 6, title: 'Chura Liya Hai Tumne', artist: 'Artist 4', src: '/songs/Chura Liya Hai Tumne.mp3', albumCover: './songs/Chura Liya Hai Tumne.jpg' },
    { id: 7, title: 'Kaho Na Kaho', artist: 'Artist 4', src: '/songs/Kaho Na Kaho.mp3', albumCover: './songs/Kaho Na Kaho.jpg' },
    { id: 8, title: 'Kisi ki Muskurahaton Pe', artist: 'Artist 4', src: '/songs/Kisi ki Muskurahaton Pe.mp3', albumCover: './songs/Kisi ki Muskurahaton Pe.jpg' },
    { id: 9, title: 'Likhe jo Khat Tujhe', artist: 'Artist 4', src: '/songs/Likhe jo Khat Tujhe.mp3', albumCover: './songs/Likhe jo Khat Tujhe.jpg' },
    { id: 10, title: 'Mere Mehboob', artist: 'Artist 4', src: '/songs/Mere Mehboob.mp3', albumCover: './songs/Mere Mehboob.jpeg' },
    { id: 11, title: 'Mere Samne Wali Khidki', artist: 'Artist 4', src: '/songs/Mere Samne Wali Khidki.mp3', albumCover: './songs/Mere Samne Wali Khidki.jpg' },
    { id: 12, title: 'Mere Sapno Ki Rani', artist: 'Artist 4', src: '/songs/Mere Sapno Ki Rani.mp3', albumCover: './songs/Mere Sapno Ki Rani.jpeg' },
    { id: 13, title: 'Haan Tu Hain', artist: 'Artist 4', src: '/songs/Haan Tu Hain.mp3', albumCover: './songs/Haan Tu Hain.jpeg' },
    { id: 14, title: 'Zara Sa', artist: 'Artist 4', src: '/songs/Zara Sa.mp3', albumCover: './songs/Zara Sa.jpeg' },
  ];

  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [progress, setProgress] = useState(0); // Track progress of the song
  const audioRef = useRef(null);

  useEffect(() => {
    // Check if there's a song passed from the SearchPage
    if (location.state && location.state.song) {
      setCurrentSong(location.state.song); // Set the current song
    }
  }, [location.state]);
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
            <li><Link to='/Search'>Search</Link></li>
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
      <div className='last-div'></div>
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
