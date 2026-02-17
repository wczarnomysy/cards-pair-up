// Jest setup file

/**
 * Setup global mocks for browser APIs
 */

// Type-safe requestAnimationFrame mock
if (!globalThis.requestAnimationFrame) {
  globalThis.requestAnimationFrame = (callback: FrameRequestCallback): number => {
    return setTimeout(callback, 0) as unknown as number;
  };
}

// Type-safe cancelAnimationFrame mock
if (!globalThis.cancelAnimationFrame) {
  globalThis.cancelAnimationFrame = (id: number): void => {
    clearTimeout(id);
  };
}
