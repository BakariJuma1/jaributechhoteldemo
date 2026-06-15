import { useState } from 'react'
import Divider from '../components/Divider'
import { galleryImages } from '../config/siteConfig'

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <main className="pt-16">
      {/* Page header */}
      <section className="bg-[#2B2D3A] py-20 px-4 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-3">
          A Feast for the Eyes
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-3">Gallery</h1>
        <Divider light />
        <p className="font-sans text-white/60 mt-4 max-w-lg mx-auto text-sm">
          From fire-kissed brisket to our warm dining room - every visit is a moment worth remembering.
        </p>
      </section>

      {/* Masonry grid */}
      <section className="bg-[#F4F4F2] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-shadow"
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-white/60 text-sm">
            {lightbox.alt}
          </p>
        </div>
      )}
    </main>
  )
}
