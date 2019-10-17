import React, { useEffect, useRef } from 'react'
// @ts-ignore
import makeAsyncScriptLoader from 'react-async-script'

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const URL = 'https://maps.googleapis.com/maps/api/js?key=' + API_KEY
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
  coordinates: {
    lat: number,
    lng: number,
  }
  google?: {
    maps?: {
      StreetViewPanorama: any
    }
  }
}

const StreetView: React.FC<StreetViewProps> = ({ coordinates, google }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (google && google.maps) {
      new google.maps.StreetViewPanorama(
        ref.current,
        {
          position: coordinates,
          ...streetViewPanoramaOptions,
        }
      );
    }
  }, [google, coordinates])

  return (
    <div
      ref={ref}
      style={{
        height: '100%',
      }}
    />
  )
}

export default makeAsyncScriptLoader(URL, {
  globalName: 'google',
})(StreetView)
