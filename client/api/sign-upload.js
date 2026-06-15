import crypto from 'node:crypto'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiSecret = process.env.CLOUDINARY_API_SECRET
  const apiKey = process.env.VITE_CLOUDINARY_API_KEY
  const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME

  if (!apiSecret || !apiKey || !cloudName) {
    return res.status(500).json({ error: 'Cloudinary env vars not configured on server' })
  }

  const timestamp = Math.round(Date.now() / 1000)
  const folder = 'restaurant'

  // Cloudinary signature: SHA1 of sorted params string + api_secret
  const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
  const signature = crypto.createHash('sha1').update(toSign).digest('hex')

  res.status(200).json({ signature, timestamp, api_key: apiKey, cloud_name: cloudName, folder })
}
