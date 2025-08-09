'use client';

import MagneticWrapper from '@/components/cursor/MagneticWrapper';

export default function CTASection() {
  return (
    <section className='py-32 md:py-40 px-6 md:px-12 lg:px-20 relative'>
      <div className='max-w-4xl mx-auto text-center'>
        {/* Main headline */}
        <h2 className='text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight'>
          Ready to Begin Your Journey?
        </h2>

        {/* Supporting text */}
        <p className='text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto'>
          Join an exclusive community of connoisseurs who appreciate the finest
          things in life
        </p>

        {/* Magnetic Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <MagneticWrapper strength={0.18} threshold={60}>
            <button 
              className='group px-10 py-5 bg-white text-black hover:bg-gray-100 transition-all duration-300 uppercase tracking-widest text-sm font-medium relative overflow-hidden'
            >
              <span className='relative z-10'>Get Started Now</span>
            </button>
          </MagneticWrapper>

          <MagneticWrapper strength={0.12} threshold={50}>
            <button 
              className='px-10 py-5 border border-white/50 hover:border-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm'
            >
              View Collection
            </button>
          </MagneticWrapper>
        </div>
      </div>
    </section>
  );
}
