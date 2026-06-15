import { useState } from 'react'
import Divider from '../components/Divider'
import { siteConfig } from '../config/siteConfig'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  return (
    <main className="pt-16">
      {/* Page header */}
      <section className="bg-[#2B2D3A] py-10 md:py-20 px-4 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-[#D89B3F] font-semibold mb-2">
          We'd Love to Hear From You
        </p>
        <h1 className="font-serif text-3xl md:text-6xl font-bold text-white mb-3">Contact Us</h1>
        <Divider light />
        <p className="font-sans text-white/60 mt-3 text-sm">
          Book a table, ask a question, or just say hello.
        </p>
      </section>

      <section className="bg-[#F4F4F2] py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10">

          {/* Left: contact info */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 md:p-7 shadow-sm">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-[#2B2D3A] mb-4">Get in Touch</h2>
              <div className="space-y-3">
                <ContactRow icon="pin" label="Address" value={siteConfig.address} />
                <ContactRow
                  icon="phone" label="Phone"
                  value={<a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-[#D89B3F] hover:underline">{siteConfig.phone}</a>}
                />
                <ContactRow
                  icon="email" label="Email"
                  value={<a href={`mailto:${siteConfig.email}`} className="text-[#D89B3F] hover:underline">{siteConfig.email}</a>}
                />
                <ContactRow
                  icon="clock" label="Hours"
                  value={<><span className="block">Mon-Fri: {siteConfig.hours.weekdays}</span><span className="block">Sat-Sun: {siteConfig.hours.weekends}</span></>}
                />
              </div>
              <div className="mt-5 flex gap-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20Jiko%20House%2C%20I'd%20like%20to%20make%20a%20reservation.`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-sans font-semibold px-4 py-2.5 rounded-full hover:bg-[#1ebe5c] transition-colors text-sm"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  WhatsApp
                </a>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-[#2B2D3A] text-[#2B2D3A] font-sans font-semibold px-4 py-2.5 rounded-full hover:bg-[#2B2D3A] hover:text-white transition-colors text-sm"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call Us
                </a>
              </div>
            </div>

            {/* M-Pesa */}
            <div className="bg-[#2B2D3A] rounded-2xl p-4 md:p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#D89B3F] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="font-sans font-semibold text-white text-sm">Pay via M-Pesa</p>
                <p className="font-sans text-white/60 text-sm">Till: <span className="text-[#D89B3F] font-bold">{siteConfig.mpesa.till}</span></p>
                <p className="font-sans text-white/40 text-xs">{siteConfig.mpesa.name}</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl p-5 md:p-7 shadow-sm">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#2B2D3A] mb-1">Send a Message</h2>
            <p className="font-sans text-gray-400 text-sm mb-4">We'll get back to you within 24 hours.</p>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[#D89B3F]/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#D89B3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2B2D3A] mb-1">Message Sent!</h3>
                <p className="font-sans text-gray-500 text-sm">We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div>
                  <label className="font-sans text-sm font-medium text-[#2B2D3A] block mb-1">Your Name</label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    placeholder="John Kamau"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-sans text-sm text-[#2B2D3A] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D89B3F]/50 focus:border-[#D89B3F] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-sans text-sm font-medium text-[#2B2D3A] block mb-1">Phone Number</label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange} required
                    placeholder="+254 7XX XXX XXX"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-sans text-sm text-[#2B2D3A] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D89B3F]/50 focus:border-[#D89B3F] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-sans text-sm font-medium text-[#2B2D3A] block mb-1">Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required
                    rows={4}
                    placeholder="I'd like to reserve a table for 4 on Saturday evening..."
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-sans text-sm text-[#2B2D3A] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D89B3F]/50 focus:border-[#D89B3F] transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-3">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Maps */}
      <section className="bg-white py-8 md:py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-5">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2D3A]">Find Us</h2>
            <Divider />
            <p className="font-sans text-gray-500 text-sm mt-1">{siteConfig.address}</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md h-56 md:h-96">
            <iframe
              src={siteConfig.mapsEmbed}
              width="100%" height="100%"
              style={{ border: 0 }}
              allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jiko House location"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

const contactIcons = {
  pin: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
  phone: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>),
  email: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>),
  clock: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
}

function ContactRow({ icon, label, value }) {
  return (
    <div className="flex gap-2.5 items-start">
      <span className="text-[#D89B3F] flex-shrink-0 mt-0.5">{contactIcons[icon]}</span>
      <div>
        <p className="font-sans text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <div className="font-sans text-sm text-[#2B2D3A] leading-snug">{value}</div>
      </div>
    </div>
  )
}
