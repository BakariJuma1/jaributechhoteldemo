import { useState, useEffect } from 'react'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import Divider from '../components/Divider'
import MenuCard from '../components/MenuCard'
import { siteConfig, menuCategories, buildWhatsAppUrl, whatsappMessages } from '../config/siteConfig'

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [categories, setCategories] = useState(menuCategories)

  useEffect(() => {
    getDocs(query(collection(db, 'menuItems'), orderBy('order')))
      .then((snap) => {
        if (snap.empty) return
        const cats = {}
        snap.docs.forEach((d) => {
          const item = { id: d.id, ...d.data() }
          if (!cats[item.category]) {
            cats[item.category] = { id: item.category, label: capitalise(item.category), items: [] }
          }
          cats[item.category].items.push(item)
        })
        setCategories(Object.values(cats))
      })
      .catch(() => {})
  }, [])

  const handleOrder = (itemName) => {
    const url = buildWhatsAppUrl(siteConfig.whatsapp, whatsappMessages.order(itemName))
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const displayItems =
    activeCategory === 'all'
      ? categories.flatMap((c) => c.items)
      : categories.find((c) => c.id === activeCategory)?.items || []

  const featuredItems = categories[0]?.items.slice(0, 4) || []

  return (
    <main className="pt-16">
      {/* Page header */}
      <section className="bg-[#2B2D3A] py-6 md:py-20 px-4 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-2">
          Jiko House
        </p>
        <h1 className="font-serif text-2xl md:text-6xl font-bold text-white mb-3">
          The PIT 100% Kenyan BBQ
        </h1>
        <Divider light />
        <p className="font-sans text-white/70 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
          Loved by Thousands - {siteConfig.description}
        </p>
      </section>

      {/* Category filter */}
      <section className="bg-white sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium font-sans transition-all ${
              activeCategory === 'all' ? 'bg-[#D89B3F] text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium font-sans transition-all ${
                activeCategory === cat.id ? 'bg-[#D89B3F] text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Alternating featured (all view only) */}
      {activeCategory === 'all' && (
        <section className="bg-[#F4F4F2] py-6 md:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-5 md:mb-12">
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-[#2B2D3A]">Pit Specialties</h2>
              <Divider />
            </div>
            <div className="space-y-5 md:space-y-16">
              {featuredItems.map((item, i) => (
                <div
                  key={item.name}
                  className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-4 md:gap-10`}
                >
                  <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-md aspect-video">
                    <img src={item.imageUrl || item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="font-serif text-xl md:text-3xl font-bold text-[#2B2D3A] mb-1">{item.name}</h3>
                    <div className="w-8 h-0.5 bg-[#D89B3F] mb-2 mx-auto md:mx-0" />
                    <p className="font-sans text-lg md:text-2xl font-semibold text-[#D89B3F] mb-2">{item.price}</p>
                    <p className="font-sans text-gray-500 text-sm leading-relaxed mb-4">{item.description}</p>
                    <button
                      onClick={() => handleOrder(item.name)}
                      className="btn-primary text-sm"
                    >
                      Order via WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Card grid */}
      <section className="bg-white py-6 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {activeCategory === 'all' ? (
            categories.map((cat) => (
              <div key={cat.id} className="mb-6 md:mb-16">
                <div className="flex items-center gap-3 mb-4 md:mb-8">
                  <h2 className="font-serif text-xl md:text-3xl font-bold text-[#2B2D3A]">{cat.label}</h2>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                  {cat.items.map((item) => (
                    <MenuCard key={item.name} {...item} onOrder={() => handleOrder(item.name)} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4 md:mb-8">
                <h2 className="font-serif text-xl md:text-3xl font-bold text-[#2B2D3A]">
                  {categories.find((c) => c.id === activeCategory)?.label}
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {displayItems.map((item) => (
                  <MenuCard key={item.name} {...item} onOrder={() => handleOrder(item.name)} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Reserve CTA */}
      <section className="bg-[#2B2D3A] py-6 md:py-16 px-4 text-center">
        <h2 className="font-serif text-xl md:text-3xl font-bold text-white mb-2">Ready to Order?</h2>
        <p className="font-sans text-white/60 mb-5 text-sm">Reserve your table or reach us directly via WhatsApp.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={buildWhatsAppUrl(siteConfig.whatsapp, whatsappMessages.reserve)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Reserve a Table
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
            className="btn-outline border-white/30 text-white hover:bg-white hover:text-[#2B2D3A]"
          >
            Call {siteConfig.phone}
          </a>
        </div>
      </section>
    </main>
  )
}

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
