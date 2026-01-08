// Shared slider interaction utilities and defaults

export const DEFAULT_DRAG_THRESHOLD = 8; // px for mouse/pen
export const DEFAULT_TAP_DISTANCE = 8;   // px for touch tap detection
export const DEFAULT_TAP_TIME = 300;     // ms for touch tap detection

// Slider-specific tuned thresholds (can be reused by pages)
export const DRAG_THRESHOLD_SOLUTIONS = 3;
export const DRAG_THRESHOLD_PRESS = 10;

export const exceededDragThreshold = (dx, threshold = DEFAULT_DRAG_THRESHOLD) => {
  return Math.abs(dx) > threshold;
};
