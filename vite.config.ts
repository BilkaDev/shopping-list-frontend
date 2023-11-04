import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    test: {
      global: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      css: true
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true, // needed for the Docker Container port mapping to work
      strictPort: true,
      port: 3000,
    },
    resolve: {

      alias: {

        "@": path.resolve(__dirname, "./src/"),

      }

    }
  };
});