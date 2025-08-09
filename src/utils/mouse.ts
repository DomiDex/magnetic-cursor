/**
 * Simple mouse position utilities
 */

import { Point } from './magnetic';

/**
 * Get current mouse position from global storage
 */
export const getMousePosition = (): Point => ({
  x: window.lastMouseX || 0,
  y: window.lastMouseY || 0,
});

/**
 * Store mouse position globally
 */
export const storeMousePosition = (x: number, y: number): void => {
  window.lastMouseX = x;
  window.lastMouseY = y;
};