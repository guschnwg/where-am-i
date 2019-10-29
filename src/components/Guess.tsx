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
      setMarker((oldMarker: any) => {
        if (oldMarker) {
          oldMarker.setMap(null)
        }

        const newMarker = new google.maps.Marker({
          position: guess,
        })
  
        newMarker.setMap(map)

        return newMarker
      })
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
        mapTypeControl: false,
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
    <div
      style={{
        backgroundColor: '#eeeeee',
        position: 'absolute',
        left: '2vw',
        bottom: '20px',
        zIndex: 2,
        border: '2px solid red',
      }}
    >
      <Resizable
        defaultSize={{
          width: 320,
          height: 200,
        }}
        minHeight={200}
        minWidth={200}
        maxHeight="30vh"
        maxWidth="96vw"
      >
        <div
          style={{
            position: 'relative',
            height: '100%',
          }}
        >
          <div
            ref={ref}
            style={{
              height: '100%',
            }}
          />

          {
            guess && (
              <button
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '10px',
                  width: 'calc(100% - 20px)',
                  height: '20px',
                }}
                onClick={handleConfirmGuess}
                >
                Confirm guess
              </button>
            )
          }
        </div>
      </Resizable>
    </div>
  )
}

export default Guess