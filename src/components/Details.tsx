import React, { useRef, useEffect } from 'react'
import { Difficulty, GameGuess } from '../types'
import '../styles/components/Details.css'
import { useMaps } from '../context/Maps'
import Flag from './Flag'
import milliToMinSec from '../utils/milliToMinSec'

interface DetailsProps {
  guess: GameGuess
  onClose: () => void
}

const Details: React.FC<DetailsProps> = ({ guess, onClose }) => {
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
      className="details-container"
    >
      <div
        className="info-container"
      >
        <div
          className="description-container"
        >
          <Flag
            countryCode={guess.place.countryCode}
            size="64"
          />

          <h2>{guess.place.name} - {guess.place.country}</h2>

          <h3>
            Foram necessários {minSec.minutes} minuto{ minSec.minutes !== 1 && 's'} e {minSec.seconds} segundo{ minSec.seconds !== 1 && 's'}.  
          </h3>

          <h4>A distância entre seu palpite e o local correto é de {guess.distance} quilômetros.</h4>

          <h4>Nível: {Difficulty[guess.place.difficulty]}</h4>

          <button
            onClick={onClose}
          >
            Continuar
          </button>
        </div>

        <div
          ref={ref}
          className="map-container"
        />
      </div>

      <iframe
        className="wikipedia-container"
        title="wikipedia"
        src={guess.place.wikipedia}
      ></iframe>
    </div>
    )
  }
  
  export default Details
  