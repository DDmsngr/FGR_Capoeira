import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// При деплое на GitHub Pages как project page (username.github.io/repo-name),
// поменяйте base на '/repo-name/'
// При деплое на корневой домен (username.github.io или custom domain) оставьте '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'lucide-react': ['lucide-react']
        }
      }
    }
  }
})
