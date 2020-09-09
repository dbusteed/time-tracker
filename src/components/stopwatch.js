import React, { useState, useEffect, useRef } from "react"
import EditableText from './editableText'
import { Button } from '@material-ui/core'


function Stopwatch(props) {
  
  const [isRunning, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [title, setTitle] = useState(`Timer #${props.number}`)
  const inputRef = useRef()

  const toggle = () => {
    setRunning(!isRunning)
  }

  const reset = () => {
    setSeconds(0)
    setRunning(false)
  }

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning, seconds])

  const mainButtonText = () => {
    if(isRunning) {
      return "Stop"
    } else if(seconds === 0) {
      return "Start"
    } else {
      return "Resume"
    }
  }
  
  return (
    <div className="timer-container">
      <div className="timer-title-container">
        <EditableText
          childRef={inputRef}
          text={title}
          placeholder={title}
        >
          <input
            ref={inputRef}
            type="text"
            name={props.number}
            value={title}
            autoComplete="off"
            onChange={e => setTitle(e.target.value)}
          />
        </EditableText>
      </div>
      <div className="timer-time-container">
        <span className="timer-time">
          {
            ("0" + Math.floor(seconds / 3600)).slice(-2) + ":" +
            ("0" + (Math.floor(seconds / 60) % 60)).slice(-2) + ":" +
            ("0" + Math.floor(seconds % 60)).slice(-2)
          }
        </span>
      </div>
      <div className="timer-controls-container">
        <div className="timer-controls-main-btn">
          <Button onClick={toggle} variant="contained" color="primary" size="large">
            {mainButtonText()}
          </Button>
        </div>
        <div>
          <Button onClick={reset} color="secondary">
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Stopwatch