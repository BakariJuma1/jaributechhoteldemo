export async function uploadToCloudinary(file) {
  // Step 1 — get a short-lived signature from our serverless function
  // The API secret never leaves the server
  const signRes = await fetch('/api/sign-upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!signRes.ok) {
    const err = await signRes.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to get upload signature')
  }

  const { signature, timestamp, api_key, cloud_name, folder } = await signRes.json()

  // Step 2 — upload directly to Cloudinary with the signed params
  const formData = new FormData()
  formData.append('file', file)
  formData.append('signature', signature)
  formData.append('timestamp', timestamp)
  formData.append('api_key', api_key)
  formData.append('folder', folder)

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    { method: 'POST', body: formData }
  )

  if (!uploadRes.ok) throw new Error('Cloudinary upload failed')
  const data = await uploadRes.json()
  return data.secure_url
}
