import { useWeather } from '../context/WeatherContext';

export const useWeatherHook = () => {
  const context = useWeather();
  if (!context) {
    throw new Error('useWeatherHook must be used within a WeatherProvider');
  }
  return context;
};
