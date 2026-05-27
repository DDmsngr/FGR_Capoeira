import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Имя репозитория на GitHub — именно оно идёт в base
  base: '/FGR_Capoeira/',
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
