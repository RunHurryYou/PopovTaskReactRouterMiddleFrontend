import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, type ManifestOptions } from 'vite-plugin-pwa'

const manifest: Partial<ManifestOptions> | false = {
    "theme_color": "#8936FF",
    "background_color": "#2EC6FE",
    "icons": [
        {
            "purpose": "maskable",
            "sizes": "512x512",
            "src": "/icon512_maskable.png",
            "type": "image/png"
        },
        {
            "purpose": "any",
            "sizes": "512x512",
            "src": "/icon512_rounded.png",
            "type": "image/png"
        }
    ],
    "orientation": "portrait",
    "display": "standalone",
    "lang": "ru-RU",
    "name": "Rick&Morty Wiki",
    "short_name": "Rick&Morty Wiki",
    "start_url": "/",
    "scope": "/"
}

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      navigateFallback: '/index.html',
    },
    manifest: manifest,
    includeAssets: ['icon512_maskable.png', 'icon512_rounded.png'],
    // Добавьте базовый путь если приложение размещено в поддиректории
    // base: '/your-subdirectory/',
  })],
  // Убедитесь, что build настроен правильно
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  // Важная конфигурация для корректных путей
  base: './',
})