import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    host: '0.0.0.0',  // Allow access from any network
    port: 3000,       // Ensure it's the correct port
    strictPort: true, // Prevent Vite from switching to another port
  },
})
