import React from 'react';
import './Profile_Page.css';


function ProfilePage({recentSongs,user,isAuthenticated,songs,setCurrentSong,setPausedTime,audioRef,setIsPlaying,setProgress}) {
  const handleStart = (song) => {
    setCurrentSong(song);
    setPausedTime(0);
    
    if(audioRef.current)
    {
      audioRef.current.src = song.src;
    audioRef.current.currentTime = 0;
  
    // Wait for the audio to be ready before playing
    audioRef.current.addEventListener('canplay', () => {
      audioRef.current.play();
      setIsPlaying(true);
      setProgress(0); // Reset progress for the new song
    }, { once: true }); // Use { once: true } to ensure the event listener is removed after the first trigger
    }
  };
    const dummyUser = {
        name: "John Doe",
        email: "john.doe@example.com",
        bio: "Software developer with a passion for creating impactful solutions. Enjoys hiking and photography.",
        profilePicture: "https://via.placeholder.com/150" // Replace with a real image URL
      };
  return (
    <div>
      <div className="profile-page">
      {
        isAuthenticated ?(
            <div className="profile-header">
        <img
          src={user.picture}
          alt={`${user.name}'s profile`}
          className="profile-picture"
        />
        <p className="profile-email">{user.email}</p>
      </div>
        ):(<div className="profile-header">
        <img
          src={dummyUser.profilePicture}
          alt={`${dummyUser.name}'s profile`}
          className="profile-picture"
        />
        <p className="profile-email">{dummyUser.email}</p>
        <h2>Please Login To See Profile.......</h2>
      </div>)
      }
    </div>
    </div>
  );
}

export default ProfilePage;
