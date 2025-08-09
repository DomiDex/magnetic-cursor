// src/lib/gsap.ts
import { gsap } from 'gsap';

// Configure GSAP defaults
gsap.config({
  nullTargetWarn: false, // Disable warnings for null targets
  force3D: true, // Force hardware acceleration
});

// Set default ease
gsap.defaults({
  ease: 'power2.out',
  duration: 0.3,
});

export { gsap };