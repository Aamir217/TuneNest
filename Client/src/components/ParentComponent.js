import React, { useState, useRef, useEffect } from "react";
import NavBar from "./NavBar";
import Library from "./Library";
import MediaPlayer from "./MediaPlayer";
import ProfilePage from "../Pages/Profile_Page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getRecentlyPlayed } from '../api/recentlyPlayed';
import { useAuth0 } from "@auth0/auth0-react";

function ParentComponent() {
  const [recentSongs, setRecentSongs] = useState([]);
  const {user, isAuthenticated } = useAuth0();
  // Fetch recently played songs on component load
  useEffect(() => {
    const fetchRecentSongs = async () => {
      if(isAuthenticated)
      {
        const songss = await getRecentlyPlayed(user.sub);
        console.log(songss);
        setRecentSongs(songss);
      }
    };

    fetchRecentSongs();
  }, [user]);
  const songs = [
    {
      id: 1,
      title: "Dil Kya Kare",
      artist: "Artist 1",
      src: "/songs/Dil Kya Kare.mp3",
      albumCover: "./songs/Dil Kya Kare.jpg",
    },
    {
      id: 2,
      title: "Likhe jo Khat Tujhe",
      artist: "Artist 2",
      src: "/songs/Likhe jo Khat Tujhe.mp3",
      albumCover: "./songs/Likhe jo Khat Tujhe.jpg",
    },
    {
      id: 3,
      title: "O Mere Dil Ke Chain",
      artist: "Artist 3",
      src: "/songs/O Mere Dil Ke Chain.mp3",
      albumCover: "./songs/O Mere Dil Ke Chain.jpg",
    },
    {
      id: 4,
      title: "Ye Shaam Mastani",
      artist: "Artist 4",
      src: "/songs/Ye Shaam Mastani.mp3",
      albumCover: "./songs/Ye Shaam Mastani.jpg",
    },
    {
      id: 5,
      title: "Chatur Naar",
      artist: "Artist 4",
      src: "/songs/Chatur Naar.mp3",
      albumCover: "./songs/Chatur Naar.jpeg",
    },
    {
      id: 6,
      title: "Chura Liya Hai Tumne",
      artist: "Artist 4",
      src: "/songs/Chura Liya Hai Tumne.mp3",
      albumCover: "./songs/Chura Liya Hai Tumne.jpg",
    },
    {
      id: 7,
      title: "Kaho Na Kaho",
      artist: "Artist 4",
      src: "/songs/Kaho Na Kaho.mp3",
      albumCover: "./songs/Kaho Na Kaho.jpg",
    },
    {
      id: 8,
      title: "Kisi ki Muskurahaton Pe",
      artist: "Artist 4",
      src: "/songs/Kisi ki Muskurahaton Pe.mp3",
      albumCover: "./songs/Kisi ki Muskurahaton Pe.jpg",
    },
    {
      id: 9,
      title: "Likhe jo Khat Tujhe",
      artist: "Artist 4",
      src: "/songs/Likhe jo Khat Tujhe.mp3",
      albumCover: "./songs/Likhe jo Khat Tujhe.jpg",
    },
    {
      id: 10,
      title: "Mere Mehboob",
      artist: "Artist 4",
      src: "/songs/Mere Mehboob.mp3",
      albumCover: "./songs/Mere Mehboob.jpeg",
    },
    {
      id: 11,
      title: "Mere Samne Wali Khidki",
      artist: "Artist 4",
      src: "/songs/Mere Samne Wali Khidki.mp3",
      albumCover: "./songs/Mere Samne Wali Khidki.jpg",
    },
    {
      id: 12,
      title: "Mere Sapno Ki Rani",
      artist: "Artist 4",
      src: "/songs/Mere Sapno Ki Rani.mp3",
      albumCover: "./songs/Mere Sapno Ki Rani.jpeg",
    },
    {
      id: 13,
      title: "Haan Tu Hain",
      artist: "Artist 4",
      src: "/songs/Haan Tu Hain.mp3",
      albumCover: "./songs/Haan Tu Hain.jpeg",
    },
    {
      id: 14,
      title: "Zara Sa",
      artist: "Artist 4",
      src: "/songs/Zara Sa.mp3",
      albumCover: "./songs/Zara Sa.jpeg",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);

  const [currentSong, setCurrentSong] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [progress, setProgress] = useState(0); // Track progress of the song
  const audioRef = useRef(null);

  return (
    <Router>
      <div>
        <NavBar
          songs={songs}
          setSearchTerm={setSearchTerm}
          setFilteredSongs={setFilteredSongs}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Library
              user={user}
              setRecentSongs={setRecentSongs}
                audioRef={audioRef}
                setIsPlaying={setIsPlaying}
                setProgress={setProgress}
                setPausedTime={setPausedTime}
                setCurrentSong={setCurrentSong}
                songs={songs}
                searchTerm={searchTerm}
                filteredSongs={filteredSongs}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProfilePage
                recentSongs={recentSongs}
                user={user}
                isAuthenticated={isAuthenticated}
                songs={songs}
                setCurrentSong={setCurrentSong}
                setPausedTime={setPausedTime}
                audioRef={audioRef}
                setIsPlaying={setIsPlaying}
                setProgress={setProgress}
              />
            }
          />
        </Routes>
        <MediaPlayer
          songs={songs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          pausedTime={pausedTime}
          setPausedTime={setPausedTime}
          progress={progress}
          setProgress={setProgress}
        />
      </div>
    </Router>
  );
}
export default ParentComponent;
