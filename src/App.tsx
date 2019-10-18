import React from 'react'
// @ts-ignore
import makeAsyncScriptLoader from 'react-async-script'
import GameScreen from './screens/Game'
import { Google } from './types'

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const URL = 'https://maps.googleapis.com/maps/api/js?key=' + API_KEY

interface AppProps {
  google?: Google
}

const App: React.FC<AppProps> = ({ google }) => {
  if (!google) {
    return <span>Loading...</span>
  }

  return (
    <GameScreen
      google={google}
    />
  )
}

export default makeAsyncScriptLoader(URL, {
  globalName: 'google',
})(App)
