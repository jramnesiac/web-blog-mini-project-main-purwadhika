import { defineConfig } from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
 
  css: {
    postcss,
  },
  plugins: [react()],
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
  
  server: {
    port: 3000
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  } 
})

