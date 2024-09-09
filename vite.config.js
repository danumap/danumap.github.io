import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Ensure base is set to root
  build: {
    outDir: 'docs', // Output to docs folder
  },
  plugins: [react()],
})