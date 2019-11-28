import React, { useState, useEffect, useCallback } from 'react'
import StreetView from '../components/StreetView'
import Guess from '../components/Guess'
import { useMaps } from '../context/Maps'
import '../styles/screens/Game.css'
import Tips from '../components/Tips'
import { Place } from '../types'

const GameScreen: React.FC = () => {
  const { getPlace } = useMaps()
  const [place, setPlace] = useState<Place>()

  const tryGetPlace = useCallback(() => {
    const place = getPlace()
    if (place) {
      setPlace(place)
    }
  }, [getPlace])

  useEffect(() => {
    tryGetPlace()
  }, [tryGetPlace])

  if (!place) {
    return (
      <span>
        Loading...
      </span>
    )
  }

  return (
    <div
      className="container"
    >
      <StreetView
        coordinates={place.coordinates}
      />

      <Guess
        coordinates={place.coordinates}
        onGuessed={tryGetPlace}
      />

      <Tips
        tips={place.tips}
      />
    </div>
  )
}

export default GameScreen
