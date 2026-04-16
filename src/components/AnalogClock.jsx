import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = ((hours % 12 + minutes / 60) / 12) * 360;

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full glass border-2 border-white/20 flex items-center justify-center">
      {/* Clock Face */}
      <div className="absolute inset-0 rounded-full">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-3 bg-white/40 left-1/2 -translate-x-1/2 origin-[center_24px] md:origin-[center_32px]"
            style={{
              top: '8px',
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
              height: i % 3 === 0 ? '12px' : '6px',
              width: i % 3 === 0 ? '3px' : '1px'
            }}
          />
        ))}
      </div>

      {/* Center Pin */}
      <div className="w-3 h-3 bg-primary rounded-full z-20 shadow-lg" />

      {/* Hour Hand */}
      <motion.div
        className="absolute w-1.5 h-16 md:h-20 bg-white rounded-full origin-bottom z-10"
        animate={{ rotate: hourDegrees }}
        transition={{ type: "spring", stiffness: 50 }}
        style={{ bottom: '50%' }}
      />

      {/* Minute Hand */}
      <motion.div
        className="absolute w-1 h-20 md:h-28 bg-white/80 rounded-full origin-bottom z-10"
        animate={{ rotate: minuteDegrees }}
        transition={{ type: "spring", stiffness: 50 }}
        style={{ bottom: '50%' }}
      />

      {/* Second Hand */}
      <motion.div
        className="absolute w-0.5 h-24 md:h-32 bg-primary rounded-full origin-bottom z-10"
        animate={{ rotate: secondDegrees }}
        transition={{ type: "linear" }}
        style={{ bottom: '50%' }}
      />
    </div>
  );
};

export default AnalogClock;
