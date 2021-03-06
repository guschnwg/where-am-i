import React, { useEffect, useRef, useState, useContext } from 'react'
import { Coordinates } from '../types'
import MapsContext from '../context/Maps'

const streetViewPanoramaOptions = {
  addressControl: false,
  showRoadLabels: false,
  pov: {
    heading: 100,
    pitch: 0,
  },
  zoom: 1,
}

interface StreetViewProps {
  coordinates: Coordinates
}

const StreetView: React.FC<StreetViewProps> = ({ coordinates }) => {
  const { google } = useContext(MapsContext)
  const ref = useRef(null)
  const [instance, setInstance] = useState()

  useEffect(() => {
    if (!instance) {
      setInstance(new google.maps.StreetViewPanorama(ref.current, streetViewPanoramaOptions))
    } else {
      instance.setPosition(coordinates)
    }
  }, [google.maps.StreetViewPanorama, instance, coordinates])

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  )
}

export default StreetView
