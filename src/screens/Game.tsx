import React, { useState, useContext, useEffect, useCallback } from 'react'
import StreetView from '../components/StreetView'
import Guess from '../components/Guess'
import MapsContext from '../context/Maps'

const GameScreen: React.FC = () => {
  const { randomStreetView } = useContext(MapsContext)
  const [coordinates, setCoordinates] = useState()

  const tryRandomPlace = useCallback(() => {
    randomStreetView().then(setCoordinates).catch(tryRandomPlace)
  }, [randomStreetView])

  useEffect(() => {
    tryRandomPlace()
  }, [tryRandomPlace])

  return (
    <div
      style={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <StreetView
        coordinates={coordinates}
      />

      <Guess
        point={coordinates}
        onGuessed={tryRandomPlace}
      />
    </div>
  )
}

export default GameScreen
