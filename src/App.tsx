import React from 'react'
import GameScreen from './screens/Game'
import { MapsContextProvider } from './context/Maps'

const App: React.FC = () => {
  return (
    <MapsContextProvider>
      <GameScreen />
    </MapsContextProvider>
  )
}

export default App
