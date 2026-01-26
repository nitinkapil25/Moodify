import { useState } from 'react'
import FacialExpression from './components/FacialExpression'
import MoodSongs from './components/MoodSongs'
import './App.css'

function App() {
  const [songs, setsongs] = useState([])

  return (
    <div className="app">
      {/* Header / Mood Detector */}
      <div className="app-header">
        <h1 className="logo">Moodify 🎧</h1>
        <FacialExpression setsongs={setsongs} />
      </div>

      {/* Songs Section */}
      <div className="app-content">
        <MoodSongs songs={songs} />
      </div>
    </div>
  )
}

export default App
