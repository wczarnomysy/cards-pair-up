import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cards-pair-up/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
