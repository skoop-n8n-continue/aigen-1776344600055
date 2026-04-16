import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { motion } from 'framer-motion';
import {
  Droplets,
  Wind,
  Sun,
  Thermometer,
  CloudRain,
  Sunrise,
  Sunset,
  Activity
} from 'lucide-react';

const WeatherCard = () => {
  const { weatherData, loading, unit } = useWeather();

  if (loading || !weatherData) {
    return <WeatherSkeleton />;
  }

  const { current } = weatherData;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-3xl p-8 max-w-4xl w-full mx-auto mt-8 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Main Info */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-4">
            <span className="text-7xl md:text-9xl font-bold text-white">
              {Math.round(current.temp)}°
            </span>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl text-white/90 font-medium">{current.condition}</span>
              <span className="text-white/70">Feels like {Math.round(current.feels_like)}°</span>
            </div>
          </div>

          <div className="mt-6 glass-dark px-4 py-2 rounded-full inline-flex items-center gap-2">
            <Activity size={18} className="text-primary" />
            <span className="text-sm font-medium">Smart Insight: {current.smart_message}</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <DetailItem icon={<Droplets />} label="Humidity" value={`${current.humidity}%`} />
          <DetailItem icon={<Wind />} label="Wind" value={`${current.wind_speed} km/h`} />
          <DetailItem icon={<Sun />} label="UV Index" value={current.uv_index} />
          <DetailItem icon={<Activity />} label="AQI" value={current.aqi} color={current.aqi > 150 ? 'text-orange-400' : 'text-green-400'} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
        <SunDetailItem icon={<Sunrise />} label="Sunrise" value={current.sunrise} />
        <SunDetailItem icon={<Sunset />} label="Sunset" value={current.sunset} />
        <div className="col-span-2 hidden md:flex items-center justify-end text-white/40 text-xs italic">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  );
};

const DetailItem = ({ icon, label, value, color = "text-white" }) => (
  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
    <div className="p-2 bg-white/10 rounded-xl text-primary">{icon}</div>
    <div className="flex flex-col">
      <span className="text-xs text-white/50 uppercase font-bold tracking-wider">{label}</span>
      <span className={`text-lg font-bold ${color}`}>{value}</span>
    </div>
  </div>
);

const SunDetailItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <div className="text-orange-300">{icon}</div>
    <div className="flex flex-col">
      <span className="text-[10px] text-white/40 uppercase">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  </div>
);

const WeatherSkeleton = () => (
  <div className="glass rounded-3xl p-8 max-w-4xl w-full mx-auto mt-8 animate-pulse">
    <div className="h-32 bg-white/5 rounded-2xl mb-8" />
    <div className="grid grid-cols-2 gap-4">
      <div className="h-20 bg-white/5 rounded-2xl" />
      <div className="h-20 bg-white/5 rounded-2xl" />
      <div className="h-20 bg-white/5 rounded-2xl" />
      <div className="h-20 bg-white/5 rounded-2xl" />
    </div>
  </div>
);

export default WeatherCard;
