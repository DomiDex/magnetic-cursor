'use client';

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export default function GSAPProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  useEffect(() => {
    // Register GSAP plugins here if needed
    // Example: gsap.registerPlugin(ScrollTrigger);
    
    // Set up global GSAP configurations
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.fps(60);
    
    return () => {
      // Cleanup if needed
      gsap.killTweensOf('*');
    };
  }, []);

  return <>{children}</>;
}