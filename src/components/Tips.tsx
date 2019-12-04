import React from 'react'
import '../styles/components/Tips.css'

interface TipsProps {
  enabled: boolean
  tips?: string[]
}

const Tips: React.FC<TipsProps> = ({ enabled, tips }) => {
  return (
    <div
      className={`tips-container${enabled ? ' tips-enabled' : ''}`}
    >
      <h2>
        Dicas
      </h2>

      {tips && (
        <div
          className="list-container"
        >
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
        </div>
      )}
    </div>
  )
}

export default Tips