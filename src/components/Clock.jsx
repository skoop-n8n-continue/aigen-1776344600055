import React, { useState, useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import AnalogClock from './AnalogClock';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [showAnalog, setShowAnalog] = useState(false);
  const { is24Hour } = useWeather();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeFormat = is24Hour ? 'HH:mm:ss' : 'hh:mm:ss a';
  const dateFormat = 'EEEE, MMMM do, yyyy';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="mb-6 pointer-events-auto">
        <button
          onClick={() => setShowAnalog(!showAnalog)}
          className="glass-dark px-4 py-2 rounded-xl text-xs font-bold text-white/50 hover:text-primary transition-colors border border-white/5"
        >
          {showAnalog ? 'Digital View' : 'Analog View'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {showAnalog ? (
          <motion.div
            key="analog"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <AnalogClock />
          </motion.div>
        ) : (
          <motion.div
            key="digital"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col items-center"
          >
            <div className="text-responsive-h1 font-bold tracking-tight text-white drop-shadow-lg">
              {format(time, is24Hour ? 'HH:mm' : 'hh:mm')}
              <span className="text-2xl md:text-4xl ml-2 font-light opacity-80">
                {format(time, is24Hour ? 'ss' : ':ss a')}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-lg md:text-2xl font-medium text-white/90 mt-6 opacity-80 tracking-wide uppercase">
        {format(time, dateFormat)}
      </div>
      <div className="text-sm md:text-base text-white/70 mt-1">
        Pakistan Standard Time (PKT) • GMT+5
      </div>
    </motion.div>
  );
};

export default Clock;
