import { defineConfig, externalizeDepsPlugin } from 'electron-vite'

import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@common': resolve('src/renderer/src/common'),
        '@interfaces': resolve('src/main/interfaces'),
        '@images': resolve('src/renderer/src/assets/images')
      }
    },
    plugins: [react()]
  }
})
