import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
  base: './',
  plugins: [tailwindcss(), react(), dts()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
} satisfies UserConfig)
