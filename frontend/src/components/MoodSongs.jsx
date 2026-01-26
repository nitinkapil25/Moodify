import React, { useRef, useState } from "react";
import "./moodsongs.css";

const MoodSongs = ({ songs }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const audioRefs = useRef([]);

  const togglePlay = (index) => {
    const audio = audioRefs.current[index];

    audioRefs.current.forEach((a, i) => {
      if (i !== index && a) {
        a.pause();
        a.currentTime = 0;
      }
    });

    if (audio.paused) {
      audio.play();
      setCurrentIndex(index);
    } else {
      audio.pause();
      setCurrentIndex(null);
    }
  };

  return (
    <div className="mood-songs">
      <h2 className="songs-title">Recommended for your mood</h2>

      {songs.length === 0 ? (
        <p className="empty-text">Detect your mood to get songs 🎭🎵</p>
      ) : (
        <div className="songs-list">
          {songs.map((song, index) => (
            <div className="song-row" key={index}>
              <div className="song-left">
                <div className="song-index">{index + 1}</div>
                <div className="song-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
              </div>

              <button
                className="play-btn"
                onClick={() => togglePlay(index)}
              >
                {currentIndex === index ? "⏸" : "▶"}
              </button>

              <audio
                ref={(el) => (audioRefs.current[index] = el)}
                src={song.audio}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodSongs;
