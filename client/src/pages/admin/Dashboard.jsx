import { useState, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {
  collection, query, orderBy, getDocs,
  addDoc, updateDoc, deleteDoc, doc, setDoc, getDoc,
} from 'firebase/firestore'
import { auth, db } from '../../lib/firebase'
import { uploadToCloudinary } from '../../lib/cloudinary'
import { siteConfig } from '../../config/siteConfig'

const CATEGORIES = ['mains', 'salads', 'beverages', 'desserts']

export default function Dashboard() {
  const [user, setUser] = useState(undefined)
  const [tab, setTab] = useState('menu')

  useEffect(() => onAuthStateChanged(auth, (u) => setUser(u ?? null)), [])

  if (user === undefined) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#D89B3F] border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (!user) return <Navigate to="/admin/login" replace />

  const tabs = [
    { key: 'menu', label: 'Menu' },
    { key: 'business', label: 'Business Info' },
    { key: 'gallery', label: 'Gallery' },
    { key: 'enquiries', label: 'Enquiries' },
  ]

  return (
    <div className="min-h-screen bg-[#F4F4F2]">
      <header className="bg-[#2B2D3A] text-white px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D89B3F] flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 14.5V16H7v-1.5A4 4 0 0 1 5 11c0-1.8 1.2-3.3 2.9-3.8C8.2 5.3 9.9 4 12 4s3.8 1.3 4.1 3.2C17.8 7.7 19 9.2 19 11a4 4 0 0 1-2 3.5z"/>
              <path d="M7 17h10v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2z"/>
            </svg>
          </div>
          <span className="font-serif font-bold text-base sm:text-lg">{siteConfig.name} — Admin</span>
        </div>
        <button onClick={() => signOut(auth)} className="font-sans text-sm text-white/60 hover:text-white transition-colors">
          Logout
        </button>
      </header>

      <nav className="bg-white border-b border-gray-100 shadow-sm px-4 flex gap-1 overflow-x-auto">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`font-sans text-sm font-medium px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
              tab === key ? 'border-[#D89B3F] text-[#D89B3F]' : 'border-transparent text-gray-500 hover:text-[#2B2D3A]'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {tab === 'menu'      && <MenuTab />}
        {tab === 'business'  && <BusinessTab />}
        {tab === 'gallery'   && <GalleryTab />}
        {tab === 'enquiries' && <EnquiriesTab />}
      </div>
    </div>
  )
}

/* ─── Shared ─────────────────────────────────────────────────────────────── */

const inputCls = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 font-sans text-sm text-[#2B2D3A] bg-white focus:outline-none focus:ring-2 focus:ring-[#D89B3F]/40 focus:border-[#D89B3F] transition-colors placeholder-gray-300'

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="font-sans text-sm font-semibold text-[#2B2D3A] block mb-1">
        {label}
        {hint && <span className="font-normal text-gray-400 ml-1.5 text-xs">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

function UploadZone({ onUpload, uploading, preview }) {
  const ref = useRef()
  return (
    <div>
      <div
        onClick={() => ref.current.click()}
        className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-[#D89B3F] hover:bg-amber-50/30 transition-colors"
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-7 h-7 border-3 border-[#D89B3F] border-t-transparent rounded-full animate-spin" />
            <p className="font-sans text-sm text-gray-400">Uploading…</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#D89B3F]/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#D89B3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="font-sans text-sm text-gray-500">Click to upload image</p>
            <p className="font-sans text-xs text-gray-300">JPG, PNG, WEBP · max 5MB</p>
          </div>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={onUpload} />
      {preview && (
        <div className="mt-3">
          <img src={preview} alt="Preview" className="w-24 h-24 rounded-xl object-cover border border-gray-100 shadow-sm" />
        </div>
      )}
    </div>
  )
}

function SaveBtn({ loading, label = 'Save', onClick }) {
  return (
    <button
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      disabled={loading}
      className="bg-[#2B2D3A] text-white font-sans text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-[#1e2030] transition-colors disabled:opacity-50 flex items-center gap-2"
    >
      {loading && <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
      {loading ? 'Saving…' : label}
    </button>
  )
}

/* ─── Menu Manager ───────────────────────────────────────────────────────── */

function MenuTab() {
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const emptyForm = { name: '', price: '', description: '', category: 'mains', imageUrl: '', order: 0 }
  const [form, setForm] = useState(emptyForm)

  const load = async () => {
    const snap = await getDocs(query(collection(db, 'menuItems'), orderBy('order')))
    setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  }
  useEffect(() => { load() }, [])

  const openAdd  = () => { setForm(emptyForm); setEditId(null); setShowForm(true) }
  const openEdit = (item) => { setForm({ name: item.name, price: item.price, description: item.description || '', category: item.category, imageUrl: item.imageUrl || '', order: item.order ?? 0 }); setEditId(item.id); setShowForm(true) }
  const cancel   = () => { setShowForm(false); setEditId(null); setForm(emptyForm) }

  const handleUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return
    setUploading(true)
    try { const imageUrl = await uploadToCloudinary(file); setForm((f) => ({ ...f, imageUrl })) }
    catch (err) { alert(err.message) }
    finally { setUploading(false) }
  }

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      const data = { ...form, order: Number(form.order) }
      editId ? await updateDoc(doc(db, 'menuItems', editId), data) : await addDoc(collection(db, 'menuItems'), data)
      cancel(); load()
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return
    await deleteDoc(doc(db, 'menuItems', id)); load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-xl font-bold text-[#2B2D3A]">Menu Items</h2>
        {!showForm && (
          <button onClick={openAdd} className="bg-[#D89B3F] text-white font-sans text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#c4882e] transition-colors">
            + Add Item
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 border border-gray-100">
          <h3 className="font-serif text-base font-bold text-[#2B2D3A] mb-4">{editId ? 'Edit Item' : 'New Menu Item'}</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Name">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className={inputCls} placeholder="Nyama Choma Platter" />
              </Field>
              <Field label="Price">
                <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className={inputCls} placeholder="Ksh 1,500" />
              </Field>
            </div>
            <Field label="Description">
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={inputCls + ' resize-none'} placeholder="Short description of the dish…" />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Category">
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </Field>
              <Field label="Sort Order" hint="lower = first">
                <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className={inputCls} />
              </Field>
            </div>
            <UploadZone onUpload={handleUpload} uploading={uploading} preview={form.imageUrl} />
            <div className="flex items-center gap-3 pt-1">
              <SaveBtn loading={saving} label={editId ? 'Update Item' : 'Add Item'} />
              <button type="button" onClick={cancel} className="font-sans text-sm text-gray-400 hover:text-gray-600 px-2 py-2">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {items.length === 0 && <p className="font-sans text-sm text-gray-400 py-6 text-center">No menu items yet.</p>}
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center">
            {item.imageUrl
              ? <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0 shadow-sm" />
              : <div className="w-14 h-14 rounded-xl bg-gray-100 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
            }
            <div className="flex-1 min-w-0">
              <p className="font-serif font-bold text-[#2B2D3A] truncate">{item.name}</p>
              <p className="font-sans text-xs text-gray-400 mt-0.5">{item.category} · {item.price}</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button onClick={() => openEdit(item)} className="font-sans text-xs font-semibold text-[#D89B3F] hover:text-[#c4882e]">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="font-sans text-xs font-semibold text-red-400 hover:text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Business Info ──────────────────────────────────────────────────────── */

function BusinessTab() {
  const [form, setForm] = useState({
    name: siteConfig.name, about: siteConfig.about || '',
    address: siteConfig.address, phone: siteConfig.phone,
    whatsapp: siteConfig.whatsapp,
    'hours.weekdays': siteConfig.hours.weekdays,
    'hours.weekends': siteConfig.hours.weekends,
    mapEmbedUrl: siteConfig.mapsEmbed,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getDoc(doc(db, 'businessInfo', 'main')).then((d) => {
      if (!d.exists()) return
      const data = d.data()
      setForm({
        name: data.name || '', about: data.about || '',
        address: data.address || '', phone: data.phone || '',
        whatsapp: data.whatsapp || '',
        'hours.weekdays': data.hours?.weekdays || '',
        'hours.weekends': data.hours?.weekends || '',
        mapEmbedUrl: data.mapEmbedUrl || '',
      })
    }).catch(() => {})
  }, [])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      await setDoc(doc(db, 'businessInfo', 'main'), {
        name: form.name, about: form.about, address: form.address,
        phone: form.phone, whatsapp: form.whatsapp,
        hours: { weekdays: form['hours.weekdays'], weekends: form['hours.weekends'] },
        mapEmbedUrl: form.mapEmbedUrl,
      })
      setSaved(true); setTimeout(() => setSaved(false), 2500)
    } finally { setSaving(false) }
  }

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-[#2B2D3A] mb-5">Business Info</h2>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Restaurant Name">
            <input value={form.name} onChange={set('name')} className={inputCls} />
          </Field>
          <Field label="About" hint="shown on About page">
            <textarea value={form.about} onChange={set('about')} rows={4} className={inputCls + ' resize-none'} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone">
              <input value={form.phone} onChange={set('phone')} className={inputCls} placeholder="+254 7XX XXX XXX" />
            </Field>
            <Field label="WhatsApp" hint="digits only, no + or spaces">
              <input value={form.whatsapp} onChange={set('whatsapp')} className={inputCls} placeholder="254712345678" />
            </Field>
          </div>
          <Field label="Address">
            <input value={form.address} onChange={set('address')} className={inputCls} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Mon – Fri hours">
              <input value={form['hours.weekdays']} onChange={set('hours.weekdays')} className={inputCls} placeholder="11:00 AM – 10:00 PM" />
            </Field>
            <Field label="Sat – Sun hours">
              <input value={form['hours.weekends']} onChange={set('hours.weekends')} className={inputCls} placeholder="10:00 AM – 11:00 PM" />
            </Field>
          </div>
          <Field label="Google Maps Embed URL">
            <input value={form.mapEmbedUrl} onChange={set('mapEmbedUrl')} className={inputCls} placeholder="https://www.google.com/maps/embed?…" />
          </Field>
          <div className="flex items-center gap-3 pt-1">
            <SaveBtn loading={saving} label="Save Changes" />
            {saved && <span className="font-sans text-sm text-green-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Saved!
            </span>}
          </div>
        </form>
      </div>
    </div>
  )
}

/* ─── Gallery Manager ────────────────────────────────────────────────────── */

function GalleryTab() {
  const [images, setImages] = useState([])
  const [form, setForm] = useState({ imageUrl: '', caption: '', order: 0 })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    const snap = await getDocs(query(collection(db, 'gallery'), orderBy('order')))
    setImages(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  }
  useEffect(() => { load() }, [])

  const handleUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return
    setUploading(true)
    try { const imageUrl = await uploadToCloudinary(file); setForm((f) => ({ ...f, imageUrl })) }
    catch (err) { alert(err.message) }
    finally { setUploading(false) }
  }

  const handleAdd = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      await addDoc(collection(db, 'gallery'), { ...form, order: Number(form.order) })
      setForm({ imageUrl: '', caption: '', order: 0 }); load()
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Remove this image?')) return
    await deleteDoc(doc(db, 'gallery', id)); load()
  }

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-[#2B2D3A] mb-5">Gallery</h2>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-serif text-base font-bold text-[#2B2D3A] mb-4">Add Image</h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <UploadZone onUpload={handleUpload} uploading={uploading} preview={form.imageUrl} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Caption">
              <input value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className={inputCls} placeholder="Warm dining ambiance" />
            </Field>
            <Field label="Sort Order" hint="lower = first">
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className={inputCls} />
            </Field>
          </div>
          <SaveBtn loading={saving} label="Add to Gallery" />
        </form>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.length === 0 && <p className="col-span-4 font-sans text-sm text-gray-400 py-6 text-center">No images yet.</p>}
        {images.map((img) => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100 shadow-sm">
            <img src={img.imageUrl} alt={img.caption} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
              {img.caption && <p className="font-sans text-white text-xs text-center line-clamp-2">{img.caption}</p>}
              <button onClick={() => handleDelete(img.id)} className="font-sans text-xs text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-full transition-colors font-semibold">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Enquiries ──────────────────────────────────────────────────────────── */

function EnquiriesTab() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDocs(query(collection(db, 'enquiries'), orderBy('createdAt', 'desc')))
      .then((snap) => setEnquiries(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this enquiry?')) return
    await deleteDoc(doc(db, 'enquiries', id))
    setEnquiries((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-[#2B2D3A] mb-5">Enquiries</h2>
      {loading && <div className="flex justify-center py-12"><div className="w-7 h-7 border-4 border-[#D89B3F] border-t-transparent rounded-full animate-spin" /></div>}
      {!loading && enquiries.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
          <p className="font-sans text-gray-400 text-sm">No enquiries yet. They'll appear here when customers submit the contact form.</p>
        </div>
      )}
      <div className="space-y-3">
        {enquiries.map((e) => (
          <div key={e.id} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-serif font-bold text-[#2B2D3A]">{e.name}</p>
                  <a href={`tel:${e.phone}`} className="font-sans text-xs text-[#D89B3F] hover:underline">{e.phone}</a>
                </div>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">{e.message}</p>
                {e.createdAt && (
                  <p className="font-sans text-xs text-gray-300 mt-2">
                    {new Date(e.createdAt.seconds * 1000).toLocaleString()}
                  </p>
                )}
              </div>
              <button onClick={() => handleDelete(e.id)} className="font-sans text-xs font-semibold text-red-400 hover:text-red-600 flex-shrink-0">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
