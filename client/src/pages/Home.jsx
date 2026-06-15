import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import Divider from '../components/Divider'
import { siteConfig, menuCategories } from '../config/siteConfig'

const featuredItems = menuCategories[0].items.slice(0, 3)

export default function Home() {
  const navigate = useNavigate()

  return (
    <main>
      <Hero />

      {/* About strip */}
      <section className="bg-white py-10 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-2">
            Nairobi's Favourite Smokehouse
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2B2D3A] mb-3">
            Jiko House.
          </h2>
          <Divider />
          <p className="font-sans text-gray-500 text-sm md:text-base leading-relaxed mt-3 max-w-2xl mx-auto">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {menuCategories.map((cat) => (
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
      <section className="bg-[#F4F4F2] py-10 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-2">
              From the Pit
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2B2D3A]">Our Signatures</h2>
            <Divider />
          </div>

          <div className="space-y-10 md:space-y-16">
            {featuredItems.map((item, i) => (
              <div
                key={item.name}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-10`}
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
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2D3A] mb-2">{item.name}</h3>
                  <div className="w-10 h-0.5 bg-[#D89B3F] mb-2 mx-auto md:mx-0" />
                  <p className="font-sans text-xl md:text-2xl font-semibold text-[#D89B3F] mb-3">{item.price}</p>
                  <p className="font-sans text-gray-500 text-sm md:text-base leading-relaxed">{item.description}</p>
                  <button
                    onClick={() => navigate('/menu')}
                    className="btn-outline mt-5 text-sm"
                  >
                    View Full Menu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-14 md:py-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-[#2B2D3A]/85" />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-2">
            Book Your Seat
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3">
            Reserve Your Table Today
          </h2>
          <Divider light />
          <p className="font-sans text-white/70 text-sm md:text-base mt-3 mb-6 leading-relaxed">
            Whether it's a quiet dinner for two or a celebration with friends - we have a table waiting for you.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="btn-primary px-8 py-3 text-sm md:text-base"
          >
            Reserve a Table
          </button>
        </div>
      </section>

      {/* Opening hours */}
      <section className="bg-white py-10 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2D3A] mb-2">Opening Hours</h2>
          <Divider />
          <div className="mt-5 grid grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="bg-[#F4F4F2] rounded-2xl p-4 md:p-6">
              <p className="font-sans font-semibold text-[#2B2D3A] text-sm mb-1">Mon - Fri</p>
              <p className="font-sans text-[#D89B3F] text-base md:text-lg font-bold">{siteConfig.hours.weekdays}</p>
            </div>
            <div className="bg-[#2B2D3A] rounded-2xl p-4 md:p-6">
              <p className="font-sans font-semibold text-white text-sm mb-1">Sat - Sun</p>
              <p className="font-sans text-[#D89B3F] text-base md:text-lg font-bold">{siteConfig.hours.weekends}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
