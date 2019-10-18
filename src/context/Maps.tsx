import React, { useContext } from 'react'
// @ts-ignore
import makeAsyncScriptLoader from 'react-async-script'
import { Google } from '../types'

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const URL = 'https://maps.googleapis.com/maps/api/js?key=' + API_KEY

interface MapsContextState {
  google: Google
}

// @ts-ignore
const MapsContext = React.createContext<MapsContextState>()

const _MapsContextProvider: React.FC<MapsContextState> = ({ google, children }) => {
  if (!google) {
    return <span>Loading...</span>
  }

  return (
    <MapsContext.Provider
      value={{
        google,
      }}
    >
      {children}
    </MapsContext.Provider>
  )
}

const MapsContextConsumer = MapsContext.Consumer
const MapsContextProvider = makeAsyncScriptLoader(URL, {
  globalName: 'google',
})(_MapsContextProvider)

const useMaps = () => useContext(MapsContext)

export {
  MapsContextProvider,
  MapsContextConsumer,
  useMaps,
}
export default MapsContext