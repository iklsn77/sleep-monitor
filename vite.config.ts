import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 移动端高保真原型，构建为静态站点，可部署到 GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: true,
    port: 5173
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
