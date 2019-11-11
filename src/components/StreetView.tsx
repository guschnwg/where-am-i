import React, { useEffect, useRef, useState, useContext } from 'react'
import { LatLng } from '../types'
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
  containerClassName?: string
  mapClassName?: string
  coordinates: LatLng
}

const StreetView: React.FC<StreetViewProps> = ({ mapClassName, containerClassName, coordinates }) => {
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
    className={containerClassName}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <div
        ref={ref}
        className={mapClassName}
        style={{
          height: '100%',
        }}
      />
    </div>
  )
}

export default StreetView
