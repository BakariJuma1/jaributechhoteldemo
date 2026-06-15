import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Divider from '../components/Divider'
import { siteConfig } from '../config/siteConfig'

const events = [
  {
    id: 1,
    title: 'Friday Night Jazz & Ribs',
    date: 'Every Friday',
    time: '7:00 PM - 11:00 PM',
    category: 'Weekly',
    description:
      'Unwind with live jazz from Nairobi\'s finest musicians while feasting on our slow-smoked ribs and craft cocktails. The perfect way to close out your week.',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80',
    spots: null,
    price: 'Free Entry',
  },
  {
    id: 2,
    title: 'BBQ Masterclass with Chef Amani',
    date: 'Saturday, 28 June 2026',
    time: '10:00 AM - 2:00 PM',
    category: 'Workshop',
    description:
      'Learn the secrets of the pit from Head Pitmaster Amani Njoroge himself. You\'ll cover fire management, dry rubs, and the perfect smoke ring. Includes a full lunch platter.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    spots: 12,
    price: 'Ksh 4,500 per person',
  },
  {
    id: 3,
    title: 'Father\'s Day Brunch Buffet',
    date: 'Sunday, 21 June 2026',
    time: '10:00 AM - 3:00 PM',
    category: 'Special',
    description:
      'Treat dad to an unlimited brunch buffet featuring carved brisket stations, live grill action, bottomless mimosas, and a dedicated kids\' corner.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    spots: 60,
    price: 'Ksh 3,200 per adult / Ksh 1,500 under 12',
  },
  {
    id: 4,
    title: 'Nairobi Food & Fire Festival',
    date: 'Saturday, 12 July 2026',
    time: '12:00 PM - 9:00 PM',
    category: 'Festival',
    description:
      'Join us for an all-day celebration of Nairobi\'s best street food and BBQ culture. Live music, cooking competitions, local vendors, and of course the Jiko House pit in full swing.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    spots: null,
    price: 'Free Entry',
  },
  {
    id: 5,
    title: 'Wine & Smoke Pairing Evening',
    date: 'Thursday, 3 July 2026',
    time: '6:30 PM - 9:30 PM',
    category: 'Special',
    description:
      'Our sommelier and pitmaster team up for an exclusive 5-course pairing experience. Each dish is matched with a curated South African or Kenyan wine. Limited seats available.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
    spots: 20,
    price: 'Ksh 7,500 per person',
  },
  {
    id: 6,
    title: 'Sunday Family Roast',
    date: 'Every Sunday',
    time: '11:00 AM - 4:00 PM',
    category: 'Weekly',
    description:
      'A beloved Jiko House tradition. Bring the whole family for a slow-roasted spread, a live carving station, and the best Sunday vibes in Westlands.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    spots: null,
    price: 'A la carte',
  },
]

const categories = ['All', 'Weekly', 'Workshop', 'Special', 'Festival']

const categoryColors = {
  Weekly: 'bg-blue-100 text-blue-700',
  Workshop: 'bg-amber-100 text-amber-700',
  Special: 'bg-rose-100 text-rose-700',
  Festival: 'bg-green-100 text-green-700',
}

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All')
  const navigate = useNavigate()

  const filtered =
    activeCategory === 'All' ? events : events.filter((e) => e.category === activeCategory)

  return (
    <main className="pt-16">
      {/* Header */}
      <section className="bg-[#2B2D3A] py-20 px-4 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-3">
          Mark Your Calendar
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-3">Upcoming Events</h1>
        <Divider light />
        <p className="font-sans text-white/60 mt-4 text-sm max-w-lg mx-auto">
          From weekly jazz nights to exclusive masterclasses - there is always something happening at Jiko House.
        </p>
      </section>

      {/* Category filter */}
      <section className="bg-white sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-medium font-sans transition-all ${
                activeCategory === cat
                  ? 'bg-[#D89B3F] text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Events grid */}
      <section className="bg-[#F4F4F2] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} onReserve={() => navigate('/contact')} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-sans text-gray-400">No events in this category right now. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Private events CTA */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-lg aspect-video">
            <img
              src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80"
              alt="Private dining at Jiko House"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2">
            <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-3">
              Private Events
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#2B2D3A] mb-3">
              Host Your Next Event with Us
            </h2>
            <Divider />
            <p className="font-sans text-gray-500 text-sm leading-relaxed mt-4 mb-6">
              Birthday celebrations, corporate dinners, team lunches, wedding brunches - our private dining
              room seats up to 50 guests and our team handles every detail, from custom menus to decor.
            </p>
            <div className="space-y-3 mb-6">
              {[
                'Custom BBQ menus tailored to your group',
                'Dedicated event coordinator',
                'AV equipment and Wi-Fi available',
                'Flexible packages starting from Ksh 50,000',
              ].map((point) => (
                <div key={point} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#D89B3F] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-sans text-sm text-gray-600">{point}</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/contact')} className="btn-primary">
              Enquire Now
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter signup strip */}
      <section className="bg-[#2B2D3A] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-2">
            Never Miss an Event
          </h2>
          <p className="font-sans text-white/60 text-sm mb-6">
            Drop your number and we will WhatsApp you when new events are announced.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="tel"
              placeholder="+254 7XX XXX XXX"
              className="flex-1 px-4 py-3 rounded-full font-sans text-sm text-[#2B2D3A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D89B3F]"
            />
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20Jiko%20House%2C%20please%20add%20me%20to%20your%20events%20updates.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-shrink-0"
            >
              Notify Me
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function EventCard({ event, onReserve }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className={`absolute top-3 left-3 text-xs font-semibold font-sans px-3 py-1 rounded-full ${categoryColors[event.category]}`}>
          {event.category}
        </span>
        {event.spots !== null && (
          <span className="absolute top-3 right-3 bg-black/60 text-white text-xs font-sans px-3 py-1 rounded-full">
            {event.spots} spots left
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-xl font-bold text-[#2B2D3A] mb-3">{event.title}</h3>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-sans">
            <svg className="w-4 h-4 text-[#D89B3F] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {event.date}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-sans">
            <svg className="w-4 h-4 text-[#D89B3F] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {event.time}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#D89B3F] font-sans">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            {event.price}
          </div>
        </div>

        <p className="font-sans text-gray-500 text-sm leading-relaxed flex-1">{event.description}</p>

        <button
          onClick={onReserve}
          className="btn-primary mt-5 text-sm py-2.5"
        >
          {event.spots !== null ? 'Reserve a Spot' : 'Learn More'}
        </button>
      </div>
    </div>
  )
}
