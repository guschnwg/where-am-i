import React, { useState, useEffect, useCallback } from 'react'
import StreetView from '../components/StreetView'
import Guess from '../components/Guess'
import Details from '../components/Details'
import Results from '../components/Results'
import TimeElapsed from '../components/TimeElapsed'
import Name from '../components/Name'
import { useMaps } from '../context/Maps'
import '../styles/screens/Game.css'
import Tips from '../components/Tips'
import { Place, Coordinates, GameGuess } from '../types'

const GameScreen: React.FC = () => {
  const { getPlace, google } = useMaps()

  const [name, setName] = useState('')

  const [place, setPlace] = useState<Place>()
  const [guess, setGuess] = useState<GameGuess>()

  const [started, setStarted] = useState(Date.now())

  const [board, setBoard] = useState('')
  const [difficulty, setDifficulty] = useState(1)

  const [history, setHistory] = useState<GameGuess[]>([])
  const [finished, setFinished] = useState(false)

  const tryGetPlace = useCallback((difficulty: number) => {
    const place = getPlace(difficulty)
  
    if (place) {
      setPlace(place)
    }
  }, [getPlace])

  const handleGuess = (coordinates: Coordinates) => {
    const time = Date.now() - started
    const minutes = Math.floor(time/ 1000 / 60)
    const seconds = Math.floor(((time - minutes) * 60))
    const distance = parseFloat((google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(coordinates),
      new google.maps.LatLng(place!.coordinates)
    ) / 1000).toFixed(2))

    const guess: GameGuess = {
      minSec: {
        minutes,
        seconds,
      },
      time,
      place: place!,
      coordinates,
      distance,
    }

    setGuess(guess)
  }

  const handleNext = () => {
    setHistory(current => {
      return [
        ...current,
        guess!,
      ]
    })
    setBoard('')
    setGuess(undefined)

    if (difficulty === 3) {
      setFinished(true)
    } else {
      setStarted(Date.now())
      setDifficulty(current => current + 1)
    }
  }

  useEffect(() => {
    tryGetPlace(difficulty)
  }, [tryGetPlace, difficulty])

  if (!name) {
    return (
      <Name
        onSubmit={setName}
      />
    )
  }

  if (!place) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (finished) {
    return (
      <Results
        name={name}
        history={history}
      />
    )
  }

  if (guess) {
    return (
      <Details
        guess={guess}
        onClose={handleNext}
      />
    )
  }

  return (
    <div
      className="container"
    >
      <div
        className="board-enable-container"
      >
        <button
          className="guess-enable"
          onClick={() => setBoard(current => current === 'Guess' ? '' : 'Guess')}
        >
          { board === 'Guess' ? 'Navegar mais' : 'Dar palpite' }
        </button>

        <button
          className="tips-enable"
          onClick={() => setBoard(current => current === 'Tips' ? '' : 'Tips')}
        >
          { board === 'Tips' ? 'Esconder dicas' : 'Mostrar dicas' }
        </button>
      </div>

      <StreetView
        coordinates={place.coordinates}
      />

      <Guess
        enabled={board === 'Guess'}
        coordinates={place.coordinates}
        onGuess={handleGuess}
      />

      <Tips
        enabled={board === 'Tips'}
        tips={place.tips}
      />

      <TimeElapsed />
    </div>
  )
}

export default GameScreen
