import React, { useEffect, useRef, useState, useContext } from 'react'
import { Point } from '../types'
import MapsContext from '../context/Maps'

interface MapsProps {
  points: Point[]
}

const Maps: React.FC<MapsProps> = ({ points }) => {
  const { google } = useContext(MapsContext)
  const ref = useRef(null)
  const [map, setMap] = useState(undefined)

  useEffect(() => {
    if (!map) {
      var center = new google.maps.LatLng(0, 0)
      var mapOptions = {
        zoom: 1,
        center,
      }
      setMap(new google.maps.Map(ref.current, mapOptions))
    }
  }, [google.maps.Map, google.maps.LatLng, map])

  useEffect(() => {
    if (map) {
      points.forEach(point => {
        const marker = new google.maps.Marker({
          position: point.position,
          label: `${point.position.lat().toFixed(2)}, ${point.position.lng().toFixed(2)}`,
          icon: {
            url: point.icon,
          },
        })
        marker.setMap(map)
      })
    }
  }, [google.maps.Marker, google.maps.LatLng, map, points])

  return (
    <div
      ref={ref}
      style={{
        height: '100%',
      }}
    />
  )
}

export default Maps
