import React, { useState, useEffect } from 'react'
import '../styles/components/Clock.css'

interface ClockProps {
    time: number
    onCompleted: () => void
}

const Clock: React.FC<ClockProps> = ({ time, onCompleted }) => {
    const [current, setCurrent] = useState(time)

    useEffect(() => {
        if (current > 0) {
            setTimeout(() => {
                setCurrent(current => current - 1)
            }, 1000)
        } else {
            onCompleted()
        }
    }, [current, onCompleted])

    useEffect(() => {
        setCurrent(time)
    }, [time])

    return (
        <div
            className="clock-container"
        >
            {current}
        </div>
    )
}

export default Clock
