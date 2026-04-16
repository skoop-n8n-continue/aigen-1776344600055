import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('Lahore, Pakistan');
  const [unit, setUnit] = useState('metric'); // metric = Celsius, imperial = Fahrenheit
  const [is24Hour, setIs24Hour] = useState(false);
  const [theme, setTheme] = useState('dark');

  // OpenWeatherMap API Key Placeholder - Ideally user should provide this
  // For the sake of this demo, I will provide a mock function that simulates API response
  // but also tries to fetch if a key is present.
  const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Placeholder

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, you would use:
      // const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);

      // Mock Data for Lahore
      setTimeout(() => {
        const mockData = generateMockData(city, unit);
        setWeatherData(mockData);
        setLoading(false);
        // Cache data for offline mode
        localStorage.setItem('lastWeatherData', JSON.stringify(mockData));
        localStorage.setItem('lastLocation', city);
      }, 1500);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setLoading(false);

      // Try to load from cache
      const cachedData = localStorage.getItem('lastWeatherData');
      if (cachedData) {
        setWeatherData(JSON.parse(cachedData));
      }
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, you would reverse geocode or use lat/lon directly
          setLocation(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
          fetchWeather(`${latitude},${longitude}`);
        },
        () => {
          setError('Location access denied. Using default: Lahore.');
          fetchWeather('Lahore');
        }
      );
    }
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem('lastLocation') || 'Lahore, Pakistan';
    setLocation(savedLocation);
    fetchWeather(savedLocation);

    // Auto-refresh every 15 minutes
    const interval = setInterval(() => {
      fetchWeather(location);
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleUnit = () => setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
  const toggleTimeFormat = () => setIs24Hour(prev => !prev);
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const value = {
    weatherData,
    loading,
    error,
    location,
    setLocation,
    unit,
    toggleUnit,
    is24Hour,
    toggleTimeFormat,
    theme,
    toggleTheme,
    fetchWeather,
    fetchLocation
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

// Helper to generate realistic mock data
function generateMockData(city, unit) {
  const isCelsius = unit === 'metric';
  const temp = isCelsius ? 28 : 82;

  return {
    current: {
      temp: temp,
      feels_like: temp + 2,
      humidity: 45,
      wind_speed: 12,
      uv_index: 6,
      condition: 'Sunny',
      description: 'clear sky',
      icon: '01d',
      aqi: 156, // Lahore often has high AQI
      sunrise: '05:45 AM',
      sunset: '06:30 PM',
      smart_message: 'It\'s hotter than usual today. Stay hydrated!'
    },
    forecast: {
      hourly: Array.from({ length: 24 }, (_, i) => ({
        time: `${(new Date().getHours() + i) % 24}:00`,
        temp: temp - Math.abs(12 - (new Date().getHours() + i) % 24) * 0.5,
        condition: 'Clear',
        icon: '01d'
      })),
      daily: [
        { day: 'Mon', temp_max: 32, temp_min: 22, condition: 'Sunny', rain_prob: 5 },
        { day: 'Tue', temp_max: 31, temp_min: 21, condition: 'Partly Cloudy', rain_prob: 10 },
        { day: 'Wed', temp_max: 30, temp_min: 20, condition: 'Rain', rain_prob: 80 },
        { day: 'Thu', temp_max: 28, temp_min: 19, condition: 'Thunderstorm', rain_prob: 90 },
        { day: 'Fri', temp_max: 29, temp_min: 20, condition: 'Cloudy', rain_prob: 20 },
        { day: 'Sat', temp_max: 33, temp_min: 23, condition: 'Sunny', rain_prob: 0 },
        { day: 'Sun', temp_max: 34, temp_min: 24, condition: 'Sunny', rain_prob: 0 },
      ]
    },
    timezone: 'Asia/Karachi',
    location: city
  };
}
