import React from 'react'
import '../styles/components/Clock.css'

interface ClockProps {
    time: number
}

const Clock: React.FC<ClockProps> = ({ time }) => {
    return (
        <div
            className="clock-container"
        >
            {time}
        </div>
    )
}

export default Clock
