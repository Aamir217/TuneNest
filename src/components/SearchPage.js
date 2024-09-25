// src/pages/SearchPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SearchPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
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

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songs);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
    const results = songs.filter(song =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
    );
    setFilteredSongs(results);
  };

  const handleSelectSong = (song) => {
    // Navigate to HomePage and pass the selected song data
    navigate('/', { state: { song } });
  };

  return (
    <div>
      <h1>Search Songs</h1>
      <input
        type="text"
        placeholder="Search by title or artist..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <div key={song.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <img src={song.albumCover} alt={`${song.title} cover`} width="100" height="100" style={{ marginRight: '20px' }} />
              <div>
                <h3>{song.title}</h3>
                <p>Artist: {song.artist}</p>
                <button onClick={() => handleSelectSong(song)}>Play</button>
              </div>
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
