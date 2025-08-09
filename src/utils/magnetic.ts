/**
 * Simplified magnetic physics utilities
 */

export interface Point {
  x: number;
  y: number;
}

export interface Bounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
}

/**
 * Calculate distance between two points
 */
export const distance = (a: Point, b: Point): number => 
  Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));

/**
 * Calculate magnetic force (0-1) based on distance
 */
export const magneticForce = (dist: number, threshold: number): number => 
  dist >= threshold ? 0 : 1 - dist / threshold;

/**
 * Get element center point
 */
export const getCenter = (bounds: Bounds): Point => ({
  x: bounds.left + bounds.width / 2,
  y: bounds.top + bounds.height / 2,
});

/**
 * Calculate magnetic pull vector
 */
export const magneticPull = (
  mouse: Point,
  target: Point,
  force: number,
  strength: number = 0.5,
  multiplier: number = 1
): Point => ({
  x: (target.x - mouse.x) * force * strength * multiplier,
  y: (target.y - mouse.y) * force * strength * multiplier,
});

/**
 * Linear interpolation
 */
export const lerp = (current: number, target: number, factor: number): number =>
  current + (target - current) * factor;

/**
 * Check if point is inside bounds
 */
export const isInside = (point: Point, bounds: Bounds): boolean =>
  point.x >= bounds.left &&
  point.x <= bounds.right &&
  point.y >= bounds.top &&
  point.y <= bounds.bottom;

/**
 * Get minimum distance to element edges
 */
export const minEdgeDistance = (point: Point, bounds: Bounds): number => {
  if (!isInside(point, bounds)) return Infinity;
  
  return Math.min(
    point.x - bounds.left,
    bounds.right - point.x,
    point.y - bounds.top,
    bounds.bottom - point.y
  );
};