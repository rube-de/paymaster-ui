import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [tailwindcss(), react(), dts()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
} satisfies UserConfig)
