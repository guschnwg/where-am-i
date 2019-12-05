import React, { useEffect, useRef, useState } from 'react'
import Axios from 'axios'
import { GameGuess } from '../types'
import '../styles/components/Results.css'
import milliToMinSec from '../utils/milliToMinSec'
import Flag from './Flag'
import { useMaps } from '../context/Maps'

interface GuessResult {
  guess: GameGuess
}

const GuessResult: React.FC<GuessResult> = ({ guess }) => {
  const { google } = useMaps()
  const ref = useRef(null)

  const minSec = milliToMinSec(guess.time)

  useEffect(() => {
    const mapOptions = {
      zoom: 0,
      maxZoom: 0,
      minZoom: 0,
      center: new google.maps.LatLng(0, 0),
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControl: false,
    }

    const map = new google.maps.Map(ref.current, mapOptions)

    const placeMarker = new google.maps.Marker({
      position: guess.place.coordinates,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      },
    })
    placeMarker.setMap(map)

    const guessMarker = new google.maps.Marker({
      position: guess.coordinates,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png',
      },
    })
    guessMarker.setMap(map)
  }, [
    google.maps.Map,
    google.maps.LatLng,
    google.maps.Marker,
    guess,
  ])

  return (
    <div
      className="place-container"
    >
      <h3>{guess.place.name} - {guess.place.country}</h3>

      <Flag
        countryCode={guess.place.countryCode}
        size="32"
      />

      <p>
        Distância: {guess.distance} quilômetros.
      </p>

      <p>
        Tempo: {minSec.minutes} minuto{ minSec.minutes !== 1 && 's'} e {minSec.seconds} segundo{ minSec.seconds !== 1 && 's'}.
      </p>

      <div
        ref={ref}
        className="map-container"
      />
    </div>
  )
}

interface ResultsProps {
  name: string
  history: GameGuess[]
}

const Results: React.FC<ResultsProps> = ({ name, history }) => {
  const [feedback, setFeedback] = useState('')

  const minSec = milliToMinSec(history.reduce<number>((agg, crr) => agg + crr.time, 0))
  const distance = history.reduce<number>((agg, crr) => agg + crr.distance, 0)

  const handleFeedback = () => {
    // fetch('https://firestore.googleapis.com/v1/projects/acessibilidade-5150f/databases/(default)/documents/feedbacks', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     fields: {
    //       name,
    //       history,
    //       minSec,
    //       distance,
    //       feedback,
    //     },
    //   })
    // }).then(console.log).catch(console.error)
    Axios.post('https://firestore.googleapis.com/v1/projects/acessibilidade-5150f/databases/(default)/documents/feedbacks', { 
      fields: { 
          name: {
            stringValue: name,
          }, 
          history: {
            stringValue: JSON.stringify(history),
          },
          minSec: {
            stringValue: JSON.stringify(minSec),
          }, 
          distance: {
            doubleValue: distance,
          },
          feedback: {
            stringValue: feedback,
          },
      },
    }).then(() => {
      window.location.reload()
    }).catch(console.error)
  }

  return (
    <div
      className="results-container"
    >
      <h2>Fim de jogo, {name}!</h2>

      <p>Foram necessários {minSec.minutes} minutos e {minSec.seconds} segundos.</p>

      <p>A distância total entre os palpites e os locais foi de {distance} quilômetros.</p>

      <div
        className="places-container"
      >
        {history.map(guess => (
          <GuessResult
            key={guess.place.id}
            guess={guess}
          />
        ))}
      </div>

      <div
        className="feedback-container"
      >
        <form
          onSubmit={event => {
            event.preventDefault()
            handleFeedback()
          }}
        >
          <label>Deixe a sua opinião abaixo, por favor</label>

          <textarea
            value={feedback}
            onChange={event => setFeedback(event.target.value)}
          ></textarea>

          <button>Confirmar</button>
        </form>
      </div>
    </div>
  )
}

export default Results
