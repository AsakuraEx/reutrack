import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // server: {
  //   https: {
  //     key: fs.readFileSync('server.key'),  // Certificado SSL autofirmado
  //     cert: fs.readFileSync('server.cert'),
  //   },
  //   port: 5173, //puerto
  //   proxy: {
  //     '/api': {
  //       target: 'http://10.168.241.44:3000', // Tu API Express en HTTP
  //       changeOrigin: true,
  //       secure: false, // Permite HTTP en desarrollo
  //     },
  //   },
  // }
})
