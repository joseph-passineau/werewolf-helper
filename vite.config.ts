import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions : Partial<VitePWAOptions> ={
  registerType: 'autoUpdate',
  devOptions: {
    enabled: true
  },
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'Werewolf Helper',
    short_name: 'Werewolf Helper',
    description: 'Werewolf Helper - Helper tool for moderators',
    theme_color: '#1976d2',
    background_color: '#1976d2',
    start_url: ".",
    icons: [
      {
        src: 'android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions)],
})
