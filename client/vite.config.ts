// /client/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests from /api to our backend server
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    }
  }
})