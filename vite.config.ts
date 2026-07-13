import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/quiz-smarts/',
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      generatedRouteTree: './src/routeTree.gen.ts',
      quoteStyle: 'single',
      semicolons: false,
    }),
    react(),
  ],
})
