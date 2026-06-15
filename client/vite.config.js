import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import crypto from 'node:crypto'

// Dev-only plugin: handles /api/sign-upload inside the Vite dev server.
// In production, Vercel routes /api/* to the serverless function in /api/.
function apiDevPlugin() {
  return {
    name: 'api-dev',
    configureServer(server) {
      server.middlewares.use('/api/sign-upload', (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'Method not allowed' }))
        }

        const apiSecret = process.env.CLOUDINARY_API_SECRET
        const apiKey = process.env.CLOUDINARY_API_KEY
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME

        if (!apiSecret || !apiKey || !cloudName) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'Cloudinary env vars not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env' }))
        }

        const timestamp = Math.round(Date.now() / 1000)
        const folder = 'restaurant'
        const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
        const signature = crypto.createHash('sha1').update(toSign).digest('hex')

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ signature, timestamp, api_key: apiKey, cloud_name: cloudName, folder }))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), apiDevPlugin()],
})
