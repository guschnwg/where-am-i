import React, { useState, useEffect } from  'react'
import '../styles/components/Tips.css'
import { Resizable } from 're-resizable'
import Clock from './Clock'

const TIPS_TIME = [10, 20, 30, 40, 50]

interface TipsProps {
  tips?: string[]
}

const Tips: React.FC<TipsProps> = ({ tips }) => {
  const [tipsShown, setTipsShown] = useState(0)
  const [time, setTime] = useState(TIPS_TIME[0])
  const [, setCounterTimeout] = useState()

  useEffect(() => {
    setTipsShown(0)
    setTime(TIPS_TIME[0])
    setCounterTimeout((current: number) => {
      clearTimeout(current)
      return null
    })
  }, [tips])

  useEffect(() => {
    if (time > 0) {
      setCounterTimeout(
        setTimeout(() => {
          setTime(time - 1)
        }, 1000)
      )
    } else {
      setTipsShown(current => current + 1)
    }
  }, [time])

  useEffect(() => {
    setTime(TIPS_TIME[tipsShown])
  }, [tipsShown])

  return (
    <Resizable
      className="tips-container"
      defaultSize={{
        height: 80,
        width: 'initial',
      }}
      enable={{
        top: true,
      }}
      minHeight={80}
      maxHeight="50%"
    >
      <h2>
        Tips

        {tipsShown <= 5 && (
          <Clock
            time={time}
          />
        )}
      </h2>

      {tips && (
        <div
          className="list-container"
        >
          <ol>
            {
              tips.slice(0, tipsShown).map((tip, index) => (
                <li
                  key={index}
                >
                  {tip}
                </li>
              ))
            }
          </ol>
        </div>
      )}
    </Resizable>
  )
}

export default Tips