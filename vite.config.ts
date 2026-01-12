import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  preview: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'esteriacosmo.ru',
      'www.esteriacosmo.ru',
      'localhost',
      '127.0.0.1',
    ],
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
