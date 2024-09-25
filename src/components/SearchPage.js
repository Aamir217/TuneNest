import React, { useState } from 'react';

const SearchPage = () => {
  // Data: List of songs
  const songs = [
    { id: 1, title: 'Song 1', artist: 'Artist 1', src: '/songs/song1.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 2, title: 'Song 2', artist: 'Artist 2', src: '/songs/song2.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 3, title: 'Song 3', artist: 'Artist 3', src: '/songs/song3.mp3', albumCover: 'https://via.placeholder.com/100' },
    { id: 4, title: 'Song 4', artist: 'Artist 4', src: '/songs/song4.mp3', albumCover: 'https://via.placeholder.com/100' },
    // Add the rest of the songs here...
  ];

  // State: Store the search query and filtered results
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songs);

  // Function to handle the search
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    // Filter songs based on title or artist
    const results = songs.filter(song =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
    );

    setFilteredSongs(results);
  };

  return (
    <div>
      <h1>Search Songs</h1>
      
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by title or artist..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Display filtered songs */}
      <div>
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <div key={song.id} style={{ marginBottom: '20px' }}>
              <img src={song.albumCover} alt={`${song.title} cover`} width="100" height="100" />
              <h3>{song.title}</h3>
              <p>Artist: {song.artist}</p>
            </div>
          ))
        ) : (
          <p>No songs found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
