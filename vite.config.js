import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['buffer']
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/stacks': {
        target: 'https://stacks-node-api.testnet.stacks.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/stacks/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  base: '/',
  preview: {
    port: 3000,
    host: true
  }
})