import React, { useState } from 'react'
import './moodsongs.css'

const MoodSongs = ({ songs }) => {

  return (
     <div className="mood-songs">
        <h2>recomended songs</h2>
        {songs.map((song, index) => (
           
           <div className="song" key={index}>
                <div className="title">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                </div>
                <div className="play-pause-button">
                  <audio src={song.audio} controls></audio>
                    <i className="ri-pause-line"></i>
                    <i className="ri-play-circle-fill"></i>
                </div>
           </div>

        ))}


     </div>
  )
}

export default MoodSongs