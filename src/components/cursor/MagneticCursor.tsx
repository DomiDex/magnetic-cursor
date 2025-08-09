'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useCursor } from '@/contexts/CursorContext';

// Extend Window interface to include lastMouseX and lastMouseY
declare global {
  interface Window {
    lastMouseX?: number;
    lastMouseY?: number;
  }
}

interface MagneticTarget {
  element: HTMLElement;
  strength: number;
  threshold: number;
}

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const targetsRef = useRef<MagneticTarget[]>([]);
  const rafRef = useRef<number | undefined>(undefined);
  
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const cursorInner = useRef({ x: 0, y: 0 });
  
  const [isSticking, setIsSticking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const stickTarget = useRef<HTMLElement | null>(null);
  const { cursorState } = useCursor();

  // Check for touch device after mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isTouchDevice) return;

    const cursorEl = cursorRef.current;
    const cursorInnerEl = cursorInnerRef.current;
    if (!cursorEl || !cursorInnerEl) return;

    // Register magnetic targets
    const registerTargets = () => {
      targetsRef.current = [];
      
      // Find all magnetic elements
      const magneticElements = document.querySelectorAll('[data-magnetic]');
      magneticElements.forEach((el) => {
        const element = el as HTMLElement;
        const strength = parseFloat(element.dataset.magneticStrength || '0.5');
        const threshold = parseFloat(element.dataset.magneticThreshold || '100');
        
        targetsRef.current.push({
          element,
          strength,
          threshold,
        });
      });
    };

    // Initial registration
    registerTargets();

    // Re-register on DOM changes
    const observer = new MutationObserver(registerTargets);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Store globally for scroll events
      window.lastMouseX = e.clientX;
      window.lastMouseY = e.clientY;
    };

    const animate = () => {
      let magneticPull = { x: 0, y: 0 };
      let closestTarget: MagneticTarget | null = null;
      let minDistance = Infinity;

      // Skip magnetic effects when in play state (video hover)
      if (cursorState !== 'play') {
        // Check all magnetic targets
        targetsRef.current.forEach((target) => {
          const rect = target.element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const distance = Math.sqrt(
            Math.pow(mouse.current.x - centerX, 2) +
            Math.pow(mouse.current.y - centerY, 2)
          );

          if (distance < target.threshold && distance < minDistance) {
            minDistance = distance;
            closestTarget = target;
            
            const force = 1 - distance / target.threshold;
            // Very subtle magnetic pull (multiplier 0.1)
            const pullX = (centerX - mouse.current.x) * force * target.strength * 0.1;
            const pullY = (centerY - mouse.current.y) * force * target.strength * 0.1;
            
            magneticPull = { x: pullX, y: pullY };
          }
        });
      }

      // Apply magnetic pull to cursor position
      const targetX = mouse.current.x + magneticPull.x;
      const targetY = mouse.current.y + magneticPull.y;

      // Smooth cursor movement with different speeds
      const speed = closestTarget ? 0.2 : 0.1;
      cursor.current.x += (targetX - cursor.current.x) * speed;
      cursor.current.y += (targetY - cursor.current.y) * speed;

      // Inner cursor with more lag
      const innerSpeed = 0.08;
      cursorInner.current.x += (targetX - cursorInner.current.x) * innerSpeed;
      cursorInner.current.y += (targetY - cursorInner.current.y) * innerSpeed;

      // Apply transforms - adjust offset based on cursor state
      const offset = cursorState === 'play' ? 50 : 20;
      
      gsap.set(cursorEl, {
        x: cursor.current.x - offset,
        y: cursor.current.y - offset,
      });

      gsap.set(cursorInnerEl, {
        x: cursorInner.current.x - 20,
        y: cursorInner.current.y - 20,
      });

      // Update sticking state
      if (closestTarget !== null && minDistance < 30) {
        if (!isSticking) {
          setIsSticking(true);
          // Type assertion to help TypeScript understand closestTarget is not null
          stickTarget.current = (closestTarget as MagneticTarget).element;
          
          // Scale up cursor when sticking
          gsap.to(cursorEl, {
            scale: 1.5,
            duration: 0.3,
          });
        }
      } else if (isSticking) {
        setIsSticking(false);
        stickTarget.current = null;
        
        // Reset cursor scale
        gsap.to(cursorEl, {
          scale: 1,
          duration: 0.3,
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [isSticking, cursorState, isTouchDevice]);

  // Handle cursor state changes
  useEffect(() => {
    const cursorEl = cursorRef.current;
    const cursorInnerEl = cursorInnerRef.current;
    if (!cursorEl || !cursorInnerEl) return;

    if (cursorState === 'play') {
      // Transform into play button - use size instead of scale to avoid pixelation
      gsap.to(cursorEl, {
        width: 100,
        height: 100,
        borderWidth: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to(cursorInnerEl, {
        opacity: 0,
        duration: 0.3,
      });
    } else if (cursorState === 'hover') {
      // Grow cursor when hovering bento cards
      gsap.to(cursorEl, {
        scale: 2,
        borderWidth: 2,
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(cursorInnerEl, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
      });
    } else if (cursorState === 'default' && !isSticking) {
      // Reset cursor
      gsap.to(cursorEl, {
        width: 40,
        height: 40,
        scale: 1,
        borderWidth: 2,
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(cursorInnerEl, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
      });
    }
  }, [cursorState, isSticking]);

  // Don't render on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor fixed top-0 left-0 w-10 h-10 border-2 rounded-full z-[9999] pointer-events-none flex items-center justify-center ${
          isSticking ? 'border-white' : 'border-white/50'
        }`}
      >
        {/* Play icon when in play state */}
        {cursorState === 'play' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-black translate-x-[2px]"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ shapeRendering: 'geometricPrecision' }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>
      <div
        ref={cursorInnerRef}
        className="custom-cursor fixed top-0 left-0 w-10 h-10 flex items-center justify-center z-[9998] pointer-events-none"
      >
        <div className={`w-1 h-1 rounded-full transition-all duration-300 ${
          isSticking ? 'w-2 h-2 bg-white' : 'bg-white/80'
        }`} />
      </div>
    </>
  );
}