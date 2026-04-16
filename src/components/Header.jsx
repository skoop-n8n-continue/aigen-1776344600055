import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { Search, Settings, MapPin, Moon, Sun, Clock as ClockIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const {
    location,
    setLocation,
    fetchWeather,
    fetchLocation,
    theme,
    toggleTheme,
    is24Hour,
    toggleTimeFormat,
    unit,
    toggleUnit
  } = useWeather();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setLocation(searchInput);
      fetchWeather(searchInput);
      setIsSearchOpen(false);
      setSearchInput('');
    }
  };

  const handleDetectLocation = () => {
    fetchLocation();
    setIsSearchOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-between items-center pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="glass-dark p-3 rounded-2xl hover:bg-white/10 transition-colors group flex items-center gap-2"
        >
          <MapPin size={20} className="text-primary group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium hidden sm:inline text-white/90">{location}</span>
        </button>
      </div>

      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={toggleTheme}
          className="glass-dark p-3 rounded-2xl hover:bg-white/10 transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-400" />}
        </button>
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="glass-dark p-3 rounded-2xl hover:bg-white/10 transition-colors"
        >
          <Settings size={20} className="text-white/70" />
        </button>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 pointer-events-auto"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass p-8 rounded-3xl w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Change Location</h2>
              <form onSubmit={handleSearch} className="relative">
                <input
                  autoFocus
                  type="text"
                  placeholder="Enter city name..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors text-lg"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              </form>
              <button
                onClick={handleDetectLocation}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-primary/20 hover:bg-primary/30 text-primary font-bold rounded-2xl transition-colors border border-primary/30"
              >
                <MapPin size={18} /> Detect My Location
              </button>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Lahore', 'Karachi', 'Islamabad', 'London', 'New York'].map(city => (
                  <button
                    key={city}
                    onClick={() => {
                      setLocation(city);
                      fetchWeather(city);
                      setIsSearchOpen(false);
                    }}
                    className="px-4 py-2 bg-white/5 hover:bg-primary/20 rounded-xl text-sm transition-colors text-white/80"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-20 right-6 z-50 pointer-events-auto"
          >
            <div className="glass-dark p-6 rounded-3xl w-64 shadow-2xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Settings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70 flex items-center gap-2">
                    <ClockIcon size={16} /> Time Format
                  </span>
                  <button
                    onClick={toggleTimeFormat}
                    className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold text-primary"
                  >
                    {is24Hour ? '24H' : '12H'}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70 flex items-center gap-2">
                    <Sun size={16} /> Unit
                  </span>
                  <button
                    onClick={toggleUnit}
                    className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold text-primary"
                  >
                    {unit === 'metric' ? '°C' : '°F'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
