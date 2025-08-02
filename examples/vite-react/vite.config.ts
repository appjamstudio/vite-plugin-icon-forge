import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import iconForge from '@appjamstudio/vite-plugin-icon-forge'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    iconForge({
      iconsDirectory: 'src/icons',
      iconSuffix: 'Icon',
      iconPrefix: '',
    })
  ],
})
