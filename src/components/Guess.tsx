import React, { useEffect, useRef, useState, useContext } from  'react'
import { Coordinates } from '../types'
import MapsContext from '../context/Maps'
import '../styles/components/Guess.css'

interface GuessProps {
  enabled: boolean
  coordinates: Coordinates
  onGuess: (guess: Coordinates) => void
}

const Guess: React.FC<GuessProps> = ({ enabled, coordinates, onGuess }) => {
  const { google } = useContext(MapsContext)

  const ref = useRef(null)
  const [map, setMap] = useState()

  const [guess, setGuess] = useState()
  const [, setMarker] = useState()

  useEffect(() => {
    if (guess) {
      setMarker((oldMarker: any) => {
        if (oldMarker) {
          oldMarker.setMap(null)
        }

        const newMarker = new google.maps.Marker({
          position: guess,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png',
          },
        })
  
        newMarker.setMap(map)

        return newMarker
      })
    }
  }, [google.maps.Marker, guess, map])

  useEffect(() => {
    const mapOptions = {
      zoom: 2,
      minZoom: 2,
      center: new google.maps.LatLng(0, 0),
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
      },
    }
    const map = new google.maps.Map(ref.current, mapOptions)

    map.addListener('click', (data: any) => {
      setGuess({
        lat: data.latLng.lat(),
        lng: data.latLng.lng()
      })
    })

    setMap(map)
  }, [
    google.maps.Map,
    google.maps.LatLng,
    google.maps.ControlPosition.TOP_RIGHT,
  ])

  return (
    <div
      className={`guess-container${enabled ? ' guess-enabled' : ''}`}
    >
      <div
        ref={ref}
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        {
          guess && (
            <button
              className="guess-confirm"
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                width: 'calc(100% - 20px)',
              }}
              onClick={() => onGuess(guess)}
            >
              Confirmar palpite
            </button>
          )
        }
      </div>
    </div>
  )
}

export default Guess