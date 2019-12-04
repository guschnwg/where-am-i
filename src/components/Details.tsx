import React, { useRef, useEffect } from 'react'
import { Difficulty, GameGuess } from '../types'
import '../styles/components/Details.css'
import { useMaps } from '../context/Maps'

interface DetailsProps {
  guess: GameGuess
  onClose: () => void
}

const Details: React.FC<DetailsProps> = ({ guess, onClose }) => {
  const { google } = useMaps()
  const ref = useRef(null)

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
    })
    placeMarker.setMap(map)

    const guessMarker = new google.maps.Marker({
      position: guess.coordinates,
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
          <img
            alt={'Bandeira de ' + guess.place.country}
            src={`https://www.countryflags.io/${guess.place.countryCode}/flat/64.png`}
          />

          <h2>{guess.place.name} - {guess.place.country}</h2>

          <h3>Você levou {guess.time.minutes} minutos e {guess.time.seconds} segundos.</h3>

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
  