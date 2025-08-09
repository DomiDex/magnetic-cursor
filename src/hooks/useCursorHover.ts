/**
 * Simple hook for cursor hover state management
 */

'use client';

import { useEffect, RefObject } from 'react';
import { useCursor } from '@/contexts/CursorContext';
import { isInside } from '@/utils/magnetic';

export function useCursorHover(
  ref: RefObject<HTMLElement>,
  hoverState: string = 'hover',
  enabled: boolean = true
) {
  const { setCursorState } = useCursor();

  useEffect(() => {
    if (!enabled) return;
    
    const element = ref.current;
    if (!element) return;

    let isHovering = false;

    const checkHover = (e: MouseEvent) => {
      const bounds = element.getBoundingClientRect();
      const inside = isInside({ x: e.clientX, y: e.clientY }, bounds);

      if (inside && !isHovering) {
        isHovering = true;
        setCursorState(hoverState);
      } else if (!inside && isHovering) {
        isHovering = false;
        setCursorState('default');
      }
    };

    const handleScroll = () => {
      if (window.lastMouseX && window.lastMouseY) {
        checkHover(new MouseEvent('mousemove', {
          clientX: window.lastMouseX,
          clientY: window.lastMouseY,
        }));
      }
    };

    window.addEventListener('mousemove', checkHover);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('scroll', handleScroll);
      if (isHovering) setCursorState('default');
    };
  }, [ref, hoverState, enabled, setCursorState]);
}