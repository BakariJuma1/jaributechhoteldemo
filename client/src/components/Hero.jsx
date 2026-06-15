import Divider from './Divider'
import { siteConfig, buildWhatsAppUrl, whatsappMessages } from '../config/siteConfig'

export default function Hero({ bizInfo }) {
  const config = bizInfo || siteConfig
  const reserveUrl = buildWhatsAppUrl(config.whatsapp || siteConfig.whatsapp, whatsappMessages.reserve)

  return (
    <section className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src="/hero.gif"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-6xl lg:text-8xl font-bold text-white leading-tight mb-1">
          Let's Eat.
        </h1>
        <Divider light />
        <p className="text-white/80 font-sans text-base md:text-xl leading-relaxed mt-3 mb-6 max-w-xl mx-auto">
          {config.tagline || siteConfig.tagline}
        </p>
        <a
          href={reserveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm md:text-base px-7 py-3 inline-block"
        >
          Reserve Table
        </a>
        <div className="mt-4 font-sans text-white/70 text-sm">
          Or Call Us:{' '}
          <a
            href={`tel:${(config.phone || siteConfig.phone).replace(/\s/g, '')}`}
            className="text-[#D89B3F] font-semibold hover:underline"
          >
            {config.phone || siteConfig.phone}
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
