import { useNavigate } from 'react-router-dom'
import Divider from './Divider'
import { siteConfig } from '../config/siteConfig'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src="/hero.gif"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-white leading-tight mb-2">
          Let's Eat.
        </h1>
        <Divider light />
        <p className="text-white/80 font-sans text-lg md:text-xl leading-relaxed mt-4 mb-8 max-w-xl mx-auto">
          {siteConfig.tagline}
        </p>
        <button
          onClick={() => navigate('/contact')}
          className="btn-primary text-base px-8 py-3"
        >
          Reserve Table
        </button>
        <div className="mt-6 font-sans text-white/70 text-sm">
          Or Call Us:{' '}
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
            className="text-[#D89B3F] font-semibold hover:underline"
          >
            {siteConfig.phone}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
