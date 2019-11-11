import React, { useState, useContext, useEffect, useCallback } from 'react'
import StreetView from '../components/StreetView'
import Guess from '../components/Guess'
import MapsContext from '../context/Maps'
import '../styles/screens/Game.css'

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
      className="container"
    >
      <h1
        className="title"
      >
        Where Am I?
      </h1>

      <div
        className="game-container"
      >
        <StreetView
          containerClassName="street-view-container"
          mapClassName="street-view-map"
          coordinates={coordinates}
        />

        <Guess
          containerClassName="guess-container"
          mapClassName="guess-map"
          point={coordinates}
          onGuessed={tryRandomPlace}
        />
      </div>
    </div>
  )
}

export default GameScreen
