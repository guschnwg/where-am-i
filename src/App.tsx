import React from 'react'
import StreetView from './components/StreetView'

const App: React.FC = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#eeeeee',
      }}
    >
      <StreetView
        coordinates={{
          lat: 46.9171876,
          lng: 17.8951832,
        }}
      />
    </div>
  );
}

export default App;
