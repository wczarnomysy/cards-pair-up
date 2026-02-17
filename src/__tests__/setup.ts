// Jest setup file
// Remove testing-library import - not needed

// Mock window.requestAnimationFrame
(globalThis as any).requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(callback, 0);
};

// Mock window.cancelAnimationFrame
(globalThis as any).cancelAnimationFrame = (id: number): void => {
  clearTimeout(id);
};
