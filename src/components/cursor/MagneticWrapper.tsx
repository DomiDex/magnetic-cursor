/**
 * Simplified magnetic wrapper - combines MagneticElement and MagneticElementEdge
 */

'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import { useCursor } from '@/contexts/CursorContext';
import { 
  distance, 
  magneticForce, 
  getCenter, 
  isInside, 
  minEdgeDistance,
  Point 
} from '@/utils/magnetic';
import { getMousePosition } from '@/utils/mouse';

interface MagneticWrapperProps {
  children: ReactNode;
  strength?: number;
  threshold?: number;
  className?: string;
  edgeOnly?: boolean;
  edgeThreshold?: number;
  growCursor?: boolean;
}

export default function MagneticWrapper({
  children,
  strength = 0.5,
  threshold = 100,
  className = '',
  edgeOnly = false,
  edgeThreshold = 60,
  growCursor = false,
}: MagneticWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | undefined>(undefined);
  const { setCursorState } = useCursor();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let isHovering = false;

    const updateBounds = () => {
      boundsRef.current = element.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!boundsRef.current) return;
      
      const mouse: Point = { x: e.clientX, y: e.clientY };
      const bounds = boundsRef.current;
      const inside = isInside(mouse, bounds);

      if (!inside) {
        // Reset when outside
        if (isHovering) {
          isHovering = false;
          if (growCursor) {
            setCursorState('default');
          }
          gsap.to(element, {
            x: 0, y: 0, scale: 1,
            duration: 0.5,
            ease: 'power3.inOut',
          });
        }
        return;
      }

      // Handle cursor growth
      if (!isHovering && growCursor) {
        isHovering = true;
        setCursorState('hover');
      }

      // Calculate magnetic effect
      let shouldApplyEffect = true;
      let force = 0;
      let pullX = 0;
      let pullY = 0;

      if (edgeOnly) {
        // Edge-only mode
        const edgeDist = minEdgeDistance(mouse, bounds);
        shouldApplyEffect = edgeDist < edgeThreshold;
        
        if (shouldApplyEffect) {
          force = 1 - edgeDist / edgeThreshold;
          
          // Pull towards nearest edge
          const distFromLeft = mouse.x - bounds.left;
          const distFromRight = bounds.right - mouse.x;
          const distFromTop = mouse.y - bounds.top;
          const distFromBottom = bounds.bottom - mouse.y;
          
          if (distFromLeft < edgeThreshold) pullX = -force * strength * 15;
          else if (distFromRight < edgeThreshold) pullX = force * strength * 15;
          
          if (distFromTop < edgeThreshold) pullY = -force * strength * 15;
          else if (distFromBottom < edgeThreshold) pullY = force * strength * 15;
        }
      } else {
        // Normal magnetic mode
        const center = getCenter(bounds);
        const dist = distance(mouse, center);
        shouldApplyEffect = dist < threshold;
        
        if (shouldApplyEffect) {
          force = magneticForce(dist, threshold);
          const direction = {
            x: mouse.x - center.x,
            y: mouse.y - center.y,
          };
          pullX = direction.x * force * strength * 20;
          pullY = direction.y * force * strength * 20;
        }
      }

      // Apply effect
      if (shouldApplyEffect) {
        gsap.to(element, {
          x: pullX,
          y: pullY,
          scale: 1 + force * 0.02,
          duration: 0.4,
          ease: 'power3.out',
        });
      } else {
        gsap.to(element, {
          x: 0, y: 0, scale: 1,
          duration: 0.5,
          ease: 'power3.inOut',
        });
      }
    };

    const handleScroll = () => {
      updateBounds();
      const mouse = getMousePosition();
      handleMouseMove(new MouseEvent('mousemove', {
        clientX: mouse.x,
        clientY: mouse.y,
      }));
    };

    // Initial bounds
    updateBounds();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateBounds);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateBounds);
      gsap.killTweensOf(element);
      if (growCursor) {
        setCursorState('default');
      }
    };
  }, [strength, threshold, edgeOnly, edgeThreshold, growCursor, setCursorState]);

  return (
    <div 
      ref={elementRef} 
      className={className}
      data-magnetic
      data-magnetic-strength={strength}
      data-magnetic-threshold={edgeOnly ? edgeThreshold : threshold}
    >
      {children}
    </div>
  );
}