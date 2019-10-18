import React, { useEffect, useRef, useState, useContext } from  'react'
import { Resizable } from 're-resizable'
import { Point } from '../types'
import MapsContext from '../context/Maps'

interface GuessProps {
  point: Point
  onGuessed: () => void
}

const Guess: React.FC<GuessProps> = ({ point, onGuessed }) => {
  const { google } = useContext(MapsContext)

  const ref = useRef(null)
  const [map, setMap] = useState()

  const [guess, setGuess] = useState()
  const [marker, setMarker] = useState()

  useEffect(() => {
    if (guess) {
      if (marker) {
        marker.setMap(null)
      }

      const newGuess = new google.maps.Marker({
        position: guess,
      })

      newGuess.setMap(map)

      setMarker(newGuess)
    }
  }, [google.maps.Marker, guess, map])
  
  useEffect(() => {
    if (!map) {
      const center = new google.maps.LatLng(0, 0)
      const mapOptions = {
        zoom: 1,
        center,
        streetViewControl: false,
        fullscreenControl: false,
      }
      const map = new google.maps.Map(ref.current, mapOptions)

      map.addListener('click', (data: any) => {
        setGuess(data.latLng)
      })

      setMap(map)
    }
  }, [google.maps.Map, google.maps.LatLng, google.maps.Marker, map])

  const handleConfirmGuess = () => {
    marker.setMap(null)

    const line = new google.maps.Polyline({
      path: [
        guess,
        point,
      ],
    })
    line.setMap(map)

    const distance = google.maps.geometry.spherical.computeDistanceBetween(guess, point)

    const correctMarker = new google.maps.Marker({
      position: point,
      label: `Distance: ${(distance / 1000).toFixed(2)}km`,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    })
    correctMarker.setMap(map)

    const guessMarker = new google.maps.Marker({
      position: guess,
      label: 'You guessed',
      icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    })
    guessMarker.setMap(map)

    onGuessed()
  }

  return (
    <Resizable
      defaultSize={{
        width: 320,
        height: 200,
      }}
      minHeight={200}
      minWidth={200}
    >
      <div
        style={{
          position: 'relative',
          height: '90%',
        }}
        >
        <div
          ref={ref}
          style={{
            height: '100%',
          }}
          />

        <button
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '10px',
            width: 'calc(100% - 20px)',
            height: '10%',
          }}
          onClick={handleConfirmGuess}
          >
          Confirm guess
        </button>
      </div>
    </Resizable>
  )
}

export default Guess