import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // @ts-ignore
} from 'react-router-dom'
import GameScreen from './screens/Game'
import { MapsContextProvider } from './context/Maps'

const App: React.FC = () => {
  return (
    <MapsContextProvider>
      <Router>
        <Switch>
          <Route path="/guessing">
            <GameScreen />
          </Route>
          <Route path="/">
            <Link to="/guessing">Guessing game</Link>
          </Route>
        </Switch>
      </Router>
    </MapsContextProvider>
  )
}

export default App
