import React, { useContext } from 'react'
import { Random, browserCrypto } from 'random-js'
// @ts-ignore
import makeAsyncScriptLoader from 'react-async-script'
import PLACES from '../data/places.json'
import { Google, LatLng, Place } from '../types'

const random = new Random(browserCrypto)

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const URL = 'https://maps.googleapis.com/maps/api/js?key=' + API_KEY + '&libraries=geometry'

interface MapsContextProps {
  google: Google
}

interface MapsContextState {
  google: Google
  randomStreetView: () => Promise<LatLng>
  getPlace: (difficulty?: number) => Place
}

// @ts-ignore
const MapsContext = React.createContext<MapsContextState>()

const MapsContextConsumer = MapsContext.Consumer
const MapsContextProvider = makeAsyncScriptLoader(URL, {
  globalName: 'google',
})((({ google, children }) => {
  if (!google) {
    return <span>Loading...</span>
  }

  const randomStreetView = () => {
    const lat = random.real(-60, 77)
    const lng = random.real(-180, 180)
  
    const service = new google.maps.StreetViewService()
  
    const location = new google.maps.LatLng(lat, lng)
  
    return new Promise((resolve, reject) => {
      service.getPanorama({
        location,
        radius: 1000000,
        source: 'outdoor',
      }, (data: any) => {
        if (data) {
          resolve(data.location.latLng)
        } else {
          reject()
        }
      })
    })
  }

  const getPlace = (difficulty?: number) => {
    const places = difficulty ? PLACES.filter(place => place.difficulty === difficulty) : PLACES
    const index = random.integer(0, places.length - 1)

    return places[index]
  }

  return (
    <MapsContext.Provider
      value={{
        google,
        randomStreetView,
        getPlace,
      }}
    >
      {children}
    </MapsContext.Provider>
  )
}) as React.FC<MapsContextProps>)

const useMaps: () => MapsContextState = () => useContext(MapsContext)

export {
  MapsContextProvider,
  MapsContextConsumer,
  useMaps,
}
export default MapsContext