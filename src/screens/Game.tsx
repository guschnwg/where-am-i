import React, { useState, useContext, useEffect } from 'react'
import { Random, browserCrypto } from 'random-js'
import StreetView from '../components/StreetView'
import Guess from '../components/Guess'
import MapsContext from '../context/Maps'

const random = new Random(browserCrypto)

const GameScreen: React.FC = () => {
  const { google } = useContext(MapsContext)

  const [coordinates, setCoordinates] = useState()
  const [points, setPoints] = useState([{
    position: coordinates,
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  }])

  const tryRandomPlace = () => {
    const lat = random.real(-60, 77)
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

  useEffect(() => {
    tryRandomPlace()
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
      }}
    >
      <StreetView
        coordinates={coordinates}
      />

      <Guess
        point={coordinates}
        onGuessed={tryRandomPlace}
      />
    </div>
  )
}

export default GameScreen
