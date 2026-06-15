import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import Hero from '../components/Hero'
import Divider from '../components/Divider'
import { siteConfig, menuCategories, buildWhatsAppUrl, whatsappMessages } from '../config/siteConfig'

export default function Home() {
  const navigate = useNavigate()
  const [bizInfo, setBizInfo] = useState(null)
  const [featuredItems, setFeaturedItems] = useState(menuCategories[0].items.slice(0, 3))
  const [menuCats, setMenuCats] = useState(menuCategories)

  useEffect(() => {
    getDoc(doc(db, 'businessInfo', 'main'))
      .then((d) => { if (d.exists()) setBizInfo(d.data()) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    getDocs(query(collection(db, 'menuItems'), orderBy('order'), limit(3)))
      .then((snap) => {
        if (!snap.empty) setFeaturedItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      })
      .catch(() => {})

    getDocs(query(collection(db, 'menuItems'), orderBy('order')))
      .then((snap) => {
        if (snap.empty) return
        const cats = {}
        snap.docs.forEach((d) => {
          const item = { id: d.id, ...d.data() }
          if (!cats[item.category]) cats[item.category] = { id: item.category, label: item.category, items: [] }
          cats[item.category].items.push(item)
        })
        setMenuCats(Object.values(cats))
      })
      .catch(() => {})
  }, [])

  const config = bizInfo || siteConfig
  const reserveUrl = buildWhatsAppUrl(config.whatsapp || siteConfig.whatsapp, whatsappMessages.reserve)

  return (
    <main>
      <Hero bizInfo={bizInfo} />

      {/* About strip */}
      <section className="bg-white py-6 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-2">
            Nairobi's Favourite Smokehouse
          </p>
          <h2 className="font-serif text-2xl md:text-5xl font-bold text-[#2B2D3A] mb-3">
            {config.name || siteConfig.name}.
          </h2>
          <Divider />
          <p className="font-sans text-gray-500 text-sm md:text-base leading-relaxed mt-3 max-w-2xl mx-auto">
            {config.description || siteConfig.description}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {menuCats.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate('/menu')}
                className="btn-primary text-sm py-2 px-5"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured items */}
      <section className="bg-[#F4F4F2] py-6 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-5 md:mb-12">
            <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-2">
              From the Pit
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2B2D3A]">Our Signatures</h2>
            <Divider />
          </div>

          <div className="space-y-6 md:space-y-16">
            {featuredItems.map((item, i) => (
              <div
                key={item.name}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-4 md:gap-10`}
              >
                <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg aspect-video">
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2D3A] mb-2">{item.name}</h3>
                  <div className="w-10 h-0.5 bg-[#D89B3F] mb-2 mx-auto md:mx-0" />
                  <p className="font-sans text-xl md:text-2xl font-semibold text-[#D89B3F] mb-3">{item.price}</p>
                  <p className="font-sans text-gray-500 text-sm md:text-base leading-relaxed">{item.description}</p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-5 justify-center md:justify-start">
                    <button onClick={() => navigate('/menu')} className="btn-outline text-sm">
                      View Full Menu
                    </button>
                    <a
                      href={buildWhatsAppUrl(config.whatsapp || siteConfig.whatsapp, whatsappMessages.order(item.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      Order via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-8 md:py-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-[#2B2D3A]/85" />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-2">
            Book Your Seat
          </p>
          <h2 className="font-serif text-2xl md:text-5xl font-bold text-white mb-3">
            Reserve Your Table Today
          </h2>
          <Divider light />
          <p className="font-sans text-white/70 text-sm md:text-base mt-3 mb-6 leading-relaxed">
            Whether it's a quiet dinner for two or a celebration with friends - we have a table waiting for you.
          </p>
          <a
            href={reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm md:text-base inline-block"
          >
            Reserve a Table
          </a>
        </div>
      </section>

      {/* Opening hours */}
      <section className="bg-white py-6 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2D3A] mb-2">Opening Hours</h2>
          <Divider />
          <div className="mt-5 grid grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="bg-[#F4F4F2] rounded-2xl p-4 md:p-6">
              <p className="font-sans font-semibold text-[#2B2D3A] text-sm mb-1">Mon - Fri</p>
              <p className="font-sans text-[#D89B3F] text-base md:text-lg font-bold">
                {config.hours?.weekdays || siteConfig.hours.weekdays}
              </p>
            </div>
            <div className="bg-[#2B2D3A] rounded-2xl p-4 md:p-6">
              <p className="font-sans font-semibold text-white text-sm mb-1">Sat - Sun</p>
              <p className="font-sans text-[#D89B3F] text-base md:text-lg font-bold">
                {config.hours?.weekends || siteConfig.hours.weekends}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
