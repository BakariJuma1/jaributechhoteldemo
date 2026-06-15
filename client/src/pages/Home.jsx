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
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-3">
            Nairobi's Favourite Smokehouse
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2B2D3A] mb-4">
            Jiko House.
          </h2>
          <Divider />
          <p className="font-sans text-gray-500 text-base leading-relaxed mt-4 max-w-2xl mx-auto">
            {siteConfig.description}
          </p>

          {/* Category pill links */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate('/menu')}
                className="btn-primary text-sm py-2 px-6"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured items */}
      <section className="bg-[#F4F4F2] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-2">
              From the Pit
            </p>
            <h2 className="font-serif text-4xl font-bold text-[#2B2D3A]">Our Signatures</h2>
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
                  <button
                    onClick={() => navigate('/menu')}
                    className="btn-outline mt-6 text-sm"
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
      <section className="relative py-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[#2B2D3A]/85" />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-3">
            Book Your Seat
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Reserve Your Table Today
          </h2>
          <Divider light />
          <p className="font-sans text-white/70 text-base mt-4 mb-8 leading-relaxed">
            Whether it's a quiet dinner for two or a celebration with friends - we have a table waiting for you.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="btn-primary px-10 py-4 text-base"
          >
            Reserve a Table
          </button>
        </div>
      </section>

      {/* Opening hours */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-[#2B2D3A] mb-2">Opening Hours</h2>
          <Divider />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
            <div className="bg-[#F4F4F2] rounded-2xl p-6">
              <p className="font-sans font-semibold text-[#2B2D3A] mb-1">Monday - Friday</p>
              <p className="font-sans text-[#D89B3F] text-lg font-bold">{siteConfig.hours.weekdays}</p>
            </div>
            <div className="bg-[#2B2D3A] rounded-2xl p-6">
              <p className="font-sans font-semibold text-white mb-1">Saturday - Sunday</p>
              <p className="font-sans text-[#D89B3F] text-lg font-bold">{siteConfig.hours.weekends}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
