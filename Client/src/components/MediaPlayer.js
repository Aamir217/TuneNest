import { useEffect } from "react";
import "./MediaPlayer.css";
import { addLikedSongs, deleteLikedSongs } from "../api/likedSongs";

function MediaPlayer({
  singers,
  setSingers,
  user,
  isLiked,
  setLikedSongs,
  songs,
  currentSong,
  setCurrentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
  pausedTime,
  setPausedTime,
  progress,
  setProgress,
}) {
  const handleLike = async () => {
    const artistNames = currentSong.artists.all.map(artist => artist.name);
    const updatedLikedSongs = await addLikedSongs(
      user.sub,
      currentSong.id,
      currentSong.name,
      artistNames,
      currentSong.downloadUrl[currentSong.downloadUrl.length-1].url,
      currentSong.image[currentSong.image.length-1].url
    );
    setLikedSongs(updatedLikedSongs.likedSongs); // Update the state with new song list
  };

  const handleDislike = async (song) => {
    const updatedLikedSongs = await deleteLikedSongs(user.sub, song.id);
    setLikedSongs(updatedLikedSongs);
  };
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
  // const handleNext = () => {
  //   const currentIndex = singers[1].findIndex((s) => s.id === currentSong.id);
  //   const nextIndex = (currentIndex + 1) % songs.length;
  //   const nextSong = songs[nextIndex];

  //   // Stop the current song if it's playing
  //   audioRef.current.pause();

  //   // Set the new song as the current song
  //   setCurrentSong(nextSong);
  //   setPausedTime(0);
  //   audioRef.current.src = nextSong.src;
  //   audioRef.current.currentTime = 0;
    

  //   // Wait for the new audio to be ready to play
  //   audioRef.current.addEventListener(
  //     "canplay",
  //     () => {
  //       audioRef.current.play();
  //       setIsPlaying(true);
  //       setProgress(0); // Reset progress for the new song
  //     },
  //     { once: true }
  //   ); // Ensure the event fires once and is removed
  // };

  const updateProgress = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 0;
    const progressPercentage = (current / duration) * 100;
    setProgress(progressPercentage);
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    // Add timeupdate event listener
    audioElement.addEventListener("timeupdate", updateProgress);

    return () => {
      // Clean up event listener
      audioElement.removeEventListener("timeupdate", updateProgress);
    };
  }, [audioRef]);

  // useEffect(() => {
  //   const audioElement = audioRef.current;

  //   const handleSongEnd = () => {
  //     handleNext(); // Move to the next song when the current one ends
  //   };

  //   audioElement.addEventListener("ended", handleSongEnd);

  //   return () => {
  //     audioElement.removeEventListener("ended", handleSongEnd);
  //   };
  // }, [currentSong]);
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickX = e.clientX - progressBar.getBoundingClientRect().left; // Get click position relative to the bar
    const newWidthPercentage = (clickX / progressBar.clientWidth) * 100; // Calculate new position as percentage

    const newTime = (newWidthPercentage / 100) * audioRef.current.duration; // Convert percentage to time
    audioRef.current.currentTime = newTime; // Seek to the new time
  };
  return (
    <div className="music-player">
      {currentSong ? (
        <>
          <h3>
            Now Playing: {currentSong.name} by{" "}
            {currentSong.artists.all.map((artist) => artist.name).join(", ")}
          </h3>
          <div className="controls">
            <button onClick={isPlaying ? handlePause : handleResume}>
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button onClick={handleLike}>Like</button>
          </div>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div className="progress" style={{ width: `${progress}%` }} />
          </div>
        </>
      ) : (
        <h3>No song is playing currently</h3>
      )}
      <audio ref={audioRef} controls style={{ display: "none" }} />
    </div>
  );
}
export default MediaPlayer;
