import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { siteConfig } from '../config/siteConfig'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Menu', to: '/menu' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Upcoming Events', to: '/events' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#2B2D3A] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#D89B3F]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </div>
            <span className="font-serif font-bold text-xl text-[#2B2D3A] tracking-tight">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium font-sans rounded transition-colors ${
                    isActive
                      ? 'text-[#D89B3F]'
                      : 'text-gray-600 hover:text-[#D89B3F]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="hidden sm:block btn-primary text-sm py-2 px-5"
            >
              Reserve a Table
            </button>
            <button
              className="md:hidden p-2 rounded text-gray-600 hover:text-[#D89B3F] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-3 text-sm font-medium font-sans rounded transition-colors ${
                    isActive
                      ? 'text-[#D89B3F] bg-amber-50'
                      : 'text-gray-600 hover:text-[#D89B3F]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => { navigate('/contact'); setMobileOpen(false) }}
              className="btn-primary text-sm mt-2"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
