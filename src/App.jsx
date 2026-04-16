import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import HomePage from './pages/HomePage';

function App() {
  return (
    <WeatherProvider>
      <HomePage />
    </WeatherProvider>
  );
}

export default App;
