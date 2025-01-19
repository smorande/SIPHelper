import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
 plugins: [react()],
 resolve: {
   alias: {
     '@': path.resolve(__dirname, './src'),
   },
 },
 build: {
   outDir: 'dist',
   chunkSizeWarningLimit: 600,
   rollupOptions: {
     output: {
       manualChunks: {
         vendor: ['react', 'react-dom', 'recharts'],
       }
     }
   }
 },
 server: {
   port: 3000,
   host: true
 }
})
