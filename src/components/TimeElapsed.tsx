import React, { useState, useEffect } from 'react'
import milliToMinSec from '../utils/milliToMinSec'
import '../styles/components/TimeElapsed.css'

const TimeElapsed: React.FC = () => {
  const [started] = useState(Date.now())
  const [time, setTime] = useState(0)

  const minSec = milliToMinSec(time)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTime(Date.now() - started)
    }, 200)

    return () => {
      clearTimeout(timeout)
    }
  }, [time, started])

  return (
    <div
      className="time-elapsed-container"
    >
      {minSec.minutes.toString().padStart(2, '0')}:{minSec.seconds.toString().padStart(2, '0')}
    </div>
  )
}

export default TimeElapsed
