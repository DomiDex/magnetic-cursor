'use client';

import MagneticWrapper from '@/components/cursor/MagneticWrapper';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 relative">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wide">
          ELEGANCE REDEFINED
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mt-6">
          Discover Timeless Beauty
        </p>
        
        {/* Magnetic button */}
        <MagneticWrapper strength={0.15} threshold={60}>
          <button 
            className="mt-12 px-10 py-4 border border-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm"
          >
            Explore
          </button>
        </MagneticWrapper>
      </div>
      
      {/* Magnetic Scroll Indicator */}
      <MagneticWrapper strength={0.05} threshold={30} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div 
          className="w-6 h-10 border border-white/30 rounded-full flex justify-center cursor-pointer"
        >
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce pointer-events-none"></div>
        </div>
      </MagneticWrapper>
    </section>
  );
}