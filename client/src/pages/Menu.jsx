import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Divider from '../components/Divider'
import MenuCard from '../components/MenuCard'
import { siteConfig, menuCategories } from '../config/siteConfig'

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all')
  const navigate = useNavigate()

  const allItems = menuCategories.flatMap((c) => c.items)
  const displayItems =
    activeCategory === 'all'
      ? allItems
      : menuCategories.find((c) => c.id === activeCategory)?.items || []

  const featuredItems = menuCategories[0].items.slice(0, 4)

  return (
    <main className="pt-16">
      {/* Page header */}
      <section className="bg-[#2B2D3A] py-20 px-4 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-3">
          Jiko House
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-3">
          The PIT 100% Kenyan BBQ
        </h1>
        <Divider light />
        <p className="font-sans text-white/70 text-base mt-4 max-w-xl mx-auto leading-relaxed">
          Loved by Thousands - {siteConfig.description}
        </p>
      </section>

      {/* Category filter tabs */}
      <section className="bg-white sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-3 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-medium font-sans transition-all ${
              activeCategory === 'all'
                ? 'bg-[#D89B3F] text-white shadow'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Items
          </button>
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-medium font-sans transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#D89B3F] text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Alternating featured items (mains only always shown at top) */}
      {activeCategory === 'all' && (
        <section className="bg-[#F4F4F2] py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-[#2B2D3A]">Pit Specialties</h2>
              <Divider />
            </div>
            <div className="space-y-16">
              {featuredItems.map((item, i) => (
                <div
                  key={item.name}
                  className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10`}
                >
                  <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg aspect-video">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="font-serif text-3xl font-bold text-[#2B2D3A] mb-2">{item.name}</h3>
                    <div className="w-10 h-0.5 bg-[#D89B3F] mb-3 mx-auto md:mx-0" />
                    <p className="font-sans text-2xl font-semibold text-[#D89B3F] mb-4">{item.price}</p>
                    <p className="font-sans text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Card grid */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {activeCategory === 'all' ? (
            menuCategories.map((cat) => (
              <div key={cat.id} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-serif text-3xl font-bold text-[#2B2D3A]">{cat.label}</h2>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {cat.items.map((item) => (
                    <MenuCard key={item.name} {...item} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-serif text-3xl font-bold text-[#2B2D3A]">
                  {menuCategories.find((c) => c.id === activeCategory)?.label}
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {displayItems.map((item) => (
                  <MenuCard key={item.name} {...item} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Reserve CTA */}
      <section className="bg-[#2B2D3A] py-16 px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-white mb-3">Ready to Order?</h2>
        <p className="font-sans text-white/60 mb-6 text-sm">
          Reserve your table or call us to place a takeaway order.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate('/contact')} className="btn-primary">
            Reserve a Table
          </button>
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
