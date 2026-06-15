import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import crypto from 'node:crypto'

function apiDevPlugin(env) {
  return {
    name: 'api-dev',
    configureServer(server) {
      server.middlewares.use('/api/sign-upload', (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'Method not allowed' }))
        }

        const apiSecret = env.CLOUDINARY_API_SECRET
        const apiKey = env.VITE_CLOUDINARY_API_KEY
        const cloudName = env.VITE_CLOUDINARY_CLOUD_NAME

        if (!apiSecret || !apiKey || !cloudName) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'Missing Cloudinary env vars. Check VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env' }))
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

export default defineConfig(({ mode }) => {
  // Load ALL vars (empty prefix) so CLOUDINARY_API_SECRET is accessible server-side
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), apiDevPlugin(env)],
  }
})
