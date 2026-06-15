import { useNavigate } from 'react-router-dom'
import Divider from '../components/Divider'
import { siteConfig } from '../config/siteConfig'

const values = [
  {
    title: 'Fire & Craft',
    description:
      'Every cut of meat is slow-smoked over real hardwood for 12 to 18 hours. No shortcuts, no compromises.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.6-7C14 5 15.927 7.655 15.927 7.655S17 6 18 6c0 4-2 6-4 8 1 0 2.5-.5 3.657-1.343z" />
      </svg>
    ),
  },
  {
    title: 'Locally Sourced',
    description:
      'We partner with Kenyan farmers and suppliers to bring the freshest, most honest ingredients to your plate.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Community First',
    description:
      'Jiko House was born in Nairobi, for Nairobi. We give back to the neighborhoods that make us who we are.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Always Welcoming',
    description:
      'Whether you are in for a quick lunch or a long evening with family, every guest leaves feeling at home.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
]

const team = [
  {
    name: 'Amani Njoroge',
    role: 'Head Pitmaster',
    bio: '20 years behind the fire. Amani trained in Texas before bringing his mastery back to Nairobi.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
  },
  {
    name: 'Zawadi Ochieng',
    role: 'Executive Chef',
    bio: 'A graduate of Le Cordon Bleu, Zawadi fuses classical French technique with bold East African flavours.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&q=80',
  },
  {
    name: 'Baraka Mutua',
    role: 'General Manager',
    bio: 'Baraka ensures every guest experience at Jiko House exceeds expectations from the moment they walk in.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
]

const milestones = [
  { year: '2016', label: 'Founded', detail: 'Jiko House opens its first location in Westlands with a 40-seat dining room.' },
  { year: '2018', label: 'Best BBQ Nairobi', detail: 'Named Best BBQ Restaurant in Nairobi by Taste of Kenya Magazine.' },
  { year: '2020', label: 'Community Kitchen', detail: 'Launched our community kitchen, providing 500+ meals weekly during the pandemic.' },
  { year: '2022', label: 'Second Location', detail: 'Expanded to Karen, bringing the Jiko House experience to the South of Nairobi.' },
  { year: '2024', label: '100,000 Guests', detail: 'Celebrated serving our 100,000th guest - a milestone for everyone on the team.' },
]

export default function About() {
  const navigate = useNavigate()

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-[#2B2D3A]/80" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-3">
            Our Story
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-3">About Jiko House</h1>
          <Divider light />
          <p className="font-sans text-white/70 mt-4 text-base leading-relaxed max-w-xl mx-auto">
            Born from a love of fire, flavour, and the people of Nairobi.
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-3">
              Where It All Started
            </p>
            <h2 className="font-serif text-4xl font-bold text-[#2B2D3A] mb-4">
              A Jiko, a Vision, and a Whole Lot of Smoke.
            </h2>
            <Divider />
            <div className="font-sans text-gray-500 text-base leading-relaxed space-y-4 mt-4">
              <p>
                Jiko House started with a single charcoal jiko in a backyard in Westlands. Our founder,
                Chef Amani Njoroge, had spent two decades perfecting the art of slow-smoked BBQ -
                studying pitmasters in Texas, learning from his grandmother in Kisumu, and eventually
                bringing it all home to Nairobi.
              </p>
              <p>
                In 2016, he opened the first Jiko House with 40 seats and one simple promise: real fire,
                real flavour, real Nairobi. Word spread fast. The queues grew longer. And the rest,
                as they say, is delicious history.
              </p>
              <p>
                Today Jiko House serves thousands of guests every month, but the soul has never changed.
                Every rack of ribs still goes over hardwood. Every sauce is still made from scratch.
                Every guest still matters.
              </p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
              alt="Nairobi street food scene"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F4F4F2] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-3">
              What Drives Us
            </p>
            <h2 className="font-serif text-4xl font-bold text-[#2B2D3A]">Our Values</h2>
            <Divider />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#D89B3F]/10 text-[#D89B3F] flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2B2D3A] mb-2">{v.title}</h3>
                <p className="font-sans text-gray-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#2B2D3A] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-3">
              The Journey
            </p>
            <h2 className="font-serif text-4xl font-bold text-white">Milestones</h2>
            <Divider light />
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-white/10 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                    <span className="font-serif text-3xl font-bold text-[#D89B3F]">{m.year}</span>
                    <h3 className="font-serif text-xl font-bold text-white mt-1">{m.label}</h3>
                    <p className="font-sans text-white/60 text-sm mt-1 leading-relaxed">{m.detail}</p>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D89B3F] border-4 border-[#2B2D3A]" />
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-3">
              The People Behind the Smoke
            </p>
            <h2 className="font-serif text-4xl font-bold text-[#2B2D3A]">Meet the Team</h2>
            <Divider />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4 shadow-md ring-4 ring-[#F4F4F2] group-hover:ring-[#D89B3F] transition-all duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2B2D3A]">{member.name}</h3>
                <p className="font-sans text-[#D89B3F] text-sm font-semibold mt-0.5 mb-2">{member.role}</p>
                <p className="font-sans text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F4F4F2] py-16 px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#2B2D3A] mb-3">Come Experience It Yourself</h2>
        <p className="font-sans text-gray-500 text-sm mb-6 max-w-md mx-auto">
          The story is best told over a plate of slow-smoked ribs. Reserve your table today.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate('/contact')} className="btn-primary">
            Reserve a Table
          </button>
          <button onClick={() => navigate('/menu')} className="btn-outline">
            View the Menu
          </button>
        </div>
      </section>
    </main>
  )
}
