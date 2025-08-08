import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    headers: {
      'X-Robots-Tag': 'noarchive, nosnippet',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN'
    }
  },
  preview: {
    headers: {
      'X-Robots-Tag': 'noarchive, nosnippet',
      'X-Content-Type-Options': 'nosniff', 
      'X-Frame-Options': 'SAMEORIGIN'
    }
  }
})
