import React, { useState, useCallback, useEffect } from  'react'
import '../styles/components/Tips.css'
import { Resizable } from 're-resizable'
import Clock from './Clock'

const TIPS_TIME = [1, 15, 30, 45, 60, 75]

interface TipsProps {
  tips?: string[]
}

const Tips: React.FC<TipsProps> = ({ tips }) => {
  const [tipsShown, setTipsShown] = useState(0)

  const handleCompleted = useCallback(() => {
    setTipsShown(current => current + 1)
  }, [])

  useEffect(() => {
    setTipsShown(0)
  }, [tips])

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
            time={TIPS_TIME[tipsShown]}
            onCompleted={handleCompleted}
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