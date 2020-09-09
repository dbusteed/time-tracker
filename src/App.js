import React, { useState } from 'react'
import './App.css'
import Stopwatch from './components/stopwatch'
import { Button } from '@material-ui/core'


function App() {

  const [timers, setTimers] = useState([1])

  const addTimer = () => {
    setTimers([...timers, timers.length + 1])
  }

  const removeTimer = () => {
    setTimers(timers.filter(x => x !== timers.length))
  }

  return (
    <div className="main-container">
      <div className="gutter"></div>
      <div className="main">
        <div className="timers">
          {
            timers.map((key, idx) => (
              <Stopwatch key={idx} number={key} />
            ))
          }
        </div>
        <div className="controls">
          <div className="add-timer-btn">
            <Button onClick={addTimer} variant="contained" color="primary" size="large">
              add timer
            </Button>
          </div>
          {
            timers.length > 1 &&
            <Button onClick={removeTimer} color="secondary">
              remove last timer
            </Button>
          }
        </div>
      </div>
      <div className="gutter"></div>
    </div>
  )
}

export default App
