import React, { useEffect, useRef, useState, useContext } from  'react'
import { Resizable } from 're-resizable'
import { Coordinates } from '../types'
import MapsContext from '../context/Maps'
import '../styles/components/Guess.css'

interface GuessProps {
  coordinates: Coordinates
  onGuessed: () => void
}

const Guess: React.FC<GuessProps> = ({ coordinates, onGuessed }) => {
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
        zoom: 2,
        minZoom: 2,
        center,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT,
        },
      }
      const map = new google.maps.Map(ref.current, mapOptions)

      // var styles = [
      //   {
      //     featureType: 'all',
      //     elementType: 'labels',
      //     stylers: [
      //       {
      //         visibility: 'off',
      //       },
      //     ],
      //   },
      // ]

      // map.setOptions({
      //   styles: styles,
      // })

      map.addListener('click', (data: any) => {
        setGuess({
          lat: data.latLng.lat(),
          lng: data.latLng.lng()
        })
      })

      setMap(map)
    }
  }, [
    google.maps.Map,
    google.maps.LatLng,
    google.maps.Marker,
    google.maps.ControlPosition.TOP_RIGHT,
    map,
  ])

  const handleConfirmGuess = () => {
    marker.setMap(null)

    const line = new google.maps.Polyline({
      path: [
        guess,
        coordinates,
      ],
    })
    line.setMap(map)

    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(guess),
      new google.maps.LatLng(coordinates)
    )

    const correctMarker = new google.maps.Marker({
      position: coordinates,
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
      className="guess-container"
      defaultSize={{
        width: 320,
        height: 320,
      }}
      enable={{
        right: true,
        bottom: true,
        bottomRight: true,
      }}
      minWidth={200}
      maxWidth="33vw"
      minHeight={200}
      maxHeight="33vw"
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
              onClick={handleConfirmGuess}
            >
              GUESS
            </button>
          )
        }
      </div>
    </Resizable>
  )
}

export default Guess