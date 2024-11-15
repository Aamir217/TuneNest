import React from "react";

function Recommendations({recommendationSongs}){
    return (
      <div>
        <h2>Recommended Songs</h2>
          <div className="song-gallery">
            {recommendationSongs.map((song) => (
              <div key={song.id} className="song-card">
                <div className="song-info">
                  <h3>{song.name}</h3>
                  <img src={song.image[2].url} alt={song.name} />
                  <button >Play</button>
                </div>
              </div>
            ))}
          </div>
      </div>
    );
}
export default Recommendations;