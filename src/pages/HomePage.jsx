import React from 'react';
import Header from '../components/Header';
import Clock from '../components/Clock';
import WeatherCard from '../components/WeatherCard';
import Forecast from '../components/Forecast';
import DynamicBackground from '../components/DynamicBackground';

const HomePage = () => {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-primary/30">
      <DynamicBackground />
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12 md:pt-32">
        {/* Hero Section: Clock */}
        <section className="mb-12 md:mb-20">
          <Clock />
        </section>

        {/* Current Weather Section */}
        <section className="mb-16">
          <WeatherCard />
        </section>

        {/* Forecast Section */}
        <section>
          <Forecast />
        </section>

        {/* Footer / Branding */}
        <footer className="mt-20 text-center text-white/30 text-xs tracking-widest uppercase pb-8">
          Optimized for Lahore, Pakistan • Skoop Agent Project 2026
        </footer>
      </main>
    </div>
  );
};

export default HomePage;
