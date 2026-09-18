import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // `@/components/Hero` instead of `../../components/Hero`. Mirrored in tsconfig.app.json.
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // Keeps both sites runnable side by side (the studio site uses Vite's default 5173).
  server: { port: 5174 },
  preview: { port: 4174 },
})
