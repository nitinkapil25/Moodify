import { useState } from 'react'
import FacialExpression from './components/FacialExpression.jsx'
import './App.css'
import MoodSongs from './components/MoodSongs.jsx'

function App() {
  // const [count, setCount] = useState(0)

  const [songs, setsongs] = useState([
   
   ])

  return (
    <>
      <FacialExpression setsongs={setsongs} />
      <MoodSongs songs={songs} />
    </>
  )
}

export default App
