import React, { useState, useContext } from 'react'
import { Random, browserCrypto } from 'random-js'
import StreetView from '../components/StreetView'
import Guess from '../components/Guess'
import MapsContext from '../context/Maps'

const random = new Random(browserCrypto)

const GameScreen: React.FC = () => {
  const { google } = useContext(MapsContext)

  const [coordinates, setCoordinates] = useState(new google.maps.LatLng(-13.1630646, -72.5448514))
  const [points, setPoints] = useState([{
    position: coordinates,
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  }])

  const tryRandomPlace = () => {
    const lat = random.real(-90, 90)
    const lng = random.real(-180, 180)

    const service = new google.maps.StreetViewService()

    const location = new google.maps.LatLng(lat, lng)

    service.getPanorama({
      location,
      radius: 1000000,
      source: 'outdoor',
    }, (data: any) => {
      if (data) {
        setPoints([
          ...points,
          {
            position: data.location.latLng,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          },
          {
            position: location,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          },
        ])
        setCoordinates(data.location.latLng)
      } else {
        setPoints([
          ...points,
          {
            position: location,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          },
        ])
        tryRandomPlace()
      }
    })
  }

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
      }}
    >
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#eeeeee',
        }}
      >
        <StreetView
          coordinates={coordinates}
        />
      </div>

      <div
        style={{
          width: '20vw',
          height: '20vh',
          backgroundColor: '#eeeeee',
          position: 'absolute',
          right: '0',
          bottom: '0',
          zIndex: 2,
        }}
      >
        <Guess
          point={coordinates}
          onGuessed={tryRandomPlace}
        />
      </div>

      <button
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          zIndex: 2,
        }}
        onClick={tryRandomPlace}
      >
        Random place
      </button>
    </div>
  )
}

export default GameScreen
