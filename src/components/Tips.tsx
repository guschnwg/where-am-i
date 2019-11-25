import React from  'react'
import '../styles/components/Tips.css'
import { Resizable } from 're-resizable'

interface TipsProps {
  tips?: string[]
  className?: string
}

const Tips: React.FC<TipsProps> = ({ className, tips }) => {
  return (
    <Resizable
      className={`tips ${className}`}
      defaultSize={{
        width: 320,
        height: 'initial',
      }}
      enable={{
        right: true,
      }}
      minWidth="20vw"
      maxWidth="33vw"
    >
      <h2>Tips</h2>

      {tips && (
        <ol>
          {
            tips.map((tip, index) => (
              <li
                key={index}
              >
                {tip}
              </li>
            ))
          }
        </ol>
      )}
    </Resizable>
  )
}

export default Tips