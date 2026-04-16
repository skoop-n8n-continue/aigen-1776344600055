import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, CloudLightning, CloudDrizzle } from 'lucide-react';

const Forecast = () => {
  const { weatherData, loading } = useWeather();

  if (loading || !weatherData) {
    return <div className="h-64 w-full flex items-center justify-center">Loading Forecast...</div>;
  }

  const { forecast } = weatherData;

  return (
    <div className="max-w-6xl w-full mx-auto mt-12 px-4 space-y-12">
      {/* Hourly Forecast */}
      <section>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 px-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          Hourly Forecast (Next 24h)
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
          {forecast.hourly.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-dark min-w-[100px] p-4 rounded-2xl flex flex-col items-center gap-2 snap-center border border-white/5 hover:border-primary/30 transition-colors"
            >
              <span className="text-sm text-white/60">{item.time}</span>
              <WeatherIcon condition={item.condition} className="text-primary w-8 h-8" />
              <span className="text-lg font-bold text-white">{Math.round(item.temp)}°</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7-Day Forecast */}
      <section>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 px-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          7-Day Forecast
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {forecast.daily.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-5 rounded-2xl flex flex-col md:items-center justify-between md:justify-center gap-3 border border-white/5"
            >
              <div className="flex items-center justify-between md:flex-col w-full md:gap-2">
                <span className="text-lg font-bold text-white">{day.day}</span>
                <WeatherIcon condition={day.condition} className="text-primary w-8 h-8" />
                <div className="flex flex-col md:items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">{day.temp_max}°</span>
                    <span className="text-sm text-white/40">{day.temp_min}°</span>
                  </div>
                  {day.rain_prob > 0 && (
                    <span className="text-[10px] text-blue-400 font-bold uppercase">{day.rain_prob}% Rain</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const WeatherIcon = ({ condition, className }) => {
  switch (condition) {
    case 'Sunny':
    case 'Clear':
      return <Sun className={className} />;
    case 'Cloudy':
    case 'Partly Cloudy':
      return <Cloud className={className} />;
    case 'Rain':
    case 'Drizzle':
      return <CloudRain className={className} />;
    case 'Thunderstorm':
      return <CloudLightning className={className} />;
    default:
      return <Cloud className={className} />;
  }
};

export default Forecast;
