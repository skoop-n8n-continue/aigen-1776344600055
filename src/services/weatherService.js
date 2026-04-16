import axios from 'axios';

const API_KEY = 'YOUR_OPENWEATHER_API_KEY';

export const weatherService = {
  getWeather: async (city, unit = 'metric') => {
    // In a real app:
    // const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);
    // return response.data;

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockData(city, unit));
      }, 1000);
    });
  }
};

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
      aqi: 156,
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
    location: city
  };
}
