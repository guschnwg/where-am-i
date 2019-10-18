import React, { useEffect, useRef, useState } from 'react'
import { Google, LatLng } from '../types'

const streetViewPanoramaOptions = {
  addressControl: false,
  addressControlOptions: false,
  showRoadLabels: false,
  disableDefaultUI: true,
  pov: {
    heading: 100,
    pitch: 0,
  },
  zoom: 1,
}

interface StreetViewProps {
  coordinates: LatLng
  google: Google
}

const StreetView: React.FC<StreetViewProps> = ({ coordinates, google }) => {
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
        height: '100%',
      }}
    />
  )
}

export default StreetView
