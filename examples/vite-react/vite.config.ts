import iconForge from '@appjamstudio/vite-plugin-icon-forge';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    iconForge({
      iconsDirectory: 'src/icons',
      iconSuffix: 'Icon',
      iconPrefix: ''
    })
  ]
});
