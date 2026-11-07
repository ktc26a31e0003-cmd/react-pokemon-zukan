import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/react-pokemon-zukan/',
  plugins: [react()],
})
