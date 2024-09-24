import React from 'react';
import './HomePage.css'; // Optional: Add your custom styles here

const HomePage = () => {
  const songs = [
    { id: 1, title: 'Song 1', artist: 'Artist 1', albumCover: 'https://via.placeholder.com/100' },
    { id: 2, title: 'Song 2', artist: 'Artist 2', albumCover: 'https://via.placeholder.com/100' },
    { id: 3, title: 'Song 3', artist: 'Artist 3', albumCover: 'https://via.placeholder.com/100' },
    // Add more songs as needed
  ];

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to TuneNest</h1>
      </header>

      <section className="song-list">
        <h2>Popular Songs</h2>
        <div className="songs">
          {songs.map((song) => (
            <div key={song.id} className="song-card">
              <img src={song.albumCover} alt={song.title} />
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="music-player">
        <h3>Now Playing: (Song title)</h3>
        <div className="controls">
          <button>Play</button>
          <button>Pause</button>
          <button>Next</button>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
