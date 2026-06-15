import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../lib/firebase'
import { siteConfig } from '../../config/siteConfig'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password)
      navigate('/admin/dashboard')
    } catch {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F4F2] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#2B2D3A] flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-[#D89B3F]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2D3A]">{siteConfig.name}</h1>
          <p className="font-sans text-sm text-gray-400 mt-1">Admin Login</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 font-sans text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-sans text-sm font-medium text-[#2B2D3A] block mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="admin@example.com"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#D89B3F]/50 focus:border-[#D89B3F] transition-colors"
            />
          </div>
          <div>
            <label className="font-sans text-sm font-medium text-[#2B2D3A] block mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#D89B3F]/50 focus:border-[#D89B3F] transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2B2D3A] text-white font-sans font-semibold py-2.5 rounded-xl hover:bg-[#1e2030] transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
