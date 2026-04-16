import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicBackground = () => {
  const { weatherData, theme } = useWeather();
  const condition = weatherData?.current?.condition || 'Clear';

  const getBackgroundStyle = () => {
    if (theme === 'light') {
      return 'bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-300';
    }

    switch (condition) {
      case 'Rain':
      case 'Drizzle':
      case 'Thunderstorm':
        return 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800';
      case 'Cloudy':
      case 'Partly Cloudy':
        return 'bg-gradient-to-br from-gray-800 via-slate-700 to-gray-900';
      default:
        return 'bg-gradient-to-br from-[#10181f] via-[#1a2b3c] to-[#0a1015]';
    }
  };

  return (
    <div className={`fixed inset-0 -z-10 transition-colors duration-1000 ${getBackgroundStyle()}`}>
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 70, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] bg-indigo-500/15 rounded-full blur-[100px]"
        />
      </div>

      {/* Condition specific animations */}
      <AnimatePresence>
        {(condition === 'Rain' || condition === 'Thunderstorm') && (
          <RainEffect />
        )}
      </AnimatePresence>
    </div>
  );
};

const RainEffect = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 pointer-events-none overflow-hidden"
  >
    {Array.from({ length: 50 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-[1px] h-10 bg-white/20"
        style={{
          left: `${Math.random() * 100}%`,
          top: `-100px`,
          animation: `rain ${0.5 + Math.random() * 0.5}s linear infinite`,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    ))}
    <style>{`
      @keyframes rain {
        to {
          transform: translateY(100vh);
        }
      }
    `}</style>
  </motion.div>
);

export default DynamicBackground;
