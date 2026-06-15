import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import {
  onAuthStateChanged, signOut,
} from 'firebase/auth'
import {
  collection, query, orderBy, getDocs,
  addDoc, updateDoc, deleteDoc, doc, setDoc, getDoc,
} from 'firebase/firestore'
import {
  ref, uploadBytes, getDownloadURL,
} from 'firebase/storage'
import { auth, db, storage } from '../../lib/firebase'
import { siteConfig } from '../../config/siteConfig'

const CATEGORIES = ['mains', 'salads', 'beverages', 'desserts']

export default function Dashboard() {
  const [user, setUser] = useState(undefined)
  const [tab, setTab] = useState('menu')

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u ?? null))
  }, [])

  if (user === undefined) return <div className="min-h-screen flex items-center justify-center font-sans text-gray-400">Loading…</div>
  if (!user) return <Navigate to="/admin/login" replace />

  return (
    <div className="min-h-screen bg-[#F4F4F2]">
      <header className="bg-[#2B2D3A] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D89B3F] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
          </div>
          <span className="font-serif font-bold text-lg">{siteConfig.name} — Admin</span>
        </div>
        <button
          onClick={() => signOut(auth)}
          className="font-sans text-sm text-white/70 hover:text-white transition-colors"
        >
          Logout
        </button>
      </header>

      <nav className="bg-white border-b border-gray-100 px-4 flex gap-1 overflow-x-auto">
        {[['menu', 'Menu Manager'], ['business', 'Business Info'], ['gallery', 'Gallery']].map(([key, label]) => (
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

      <div className="max-w-5xl mx-auto px-4 py-6">
        {tab === 'menu' && <MenuTab />}
        {tab === 'business' && <BusinessTab />}
        {tab === 'gallery' && <GalleryTab />}
      </div>
    </div>
  )
}

/* ─── Menu Manager ────────────────────────────────────────────────────── */

function MenuTab() {
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const emptyForm = { name: '', price: '', description: '', category: 'mains', imageUrl: '', order: 0 }
  const [form, setForm] = useState(emptyForm)

  const load = async () => {
    const snap = await getDocs(query(collection(db, 'menuItems'), orderBy('order')))
    setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowForm(true) }
  const openEdit = (item) => { setForm({ name: item.name, price: item.price, description: item.description, category: item.category, imageUrl: item.imageUrl || '', order: item.order ?? 0 }); setEditId(item.id); setShowForm(true) }
  const cancel = () => { setShowForm(false); setEditId(null); setForm(emptyForm) }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const storageRef = ref(storage, `menu/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setForm((f) => ({ ...f, imageUrl: url }))
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const data = { ...form, order: Number(form.order) }
    if (editId) {
      await updateDoc(doc(db, 'menuItems', editId), data)
    } else {
      await addDoc(collection(db, 'menuItems'), data)
    }
    cancel()
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return
    await deleteDoc(doc(db, 'menuItems', id))
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl font-bold text-[#2B2D3A]">Menu Items</h2>
        {!showForm && (
          <button onClick={openAdd} className="bg-[#D89B3F] text-white font-sans text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#c4882e] transition-colors">
            + Add Item
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="font-serif text-lg font-bold text-[#2B2D3A] mb-4">{editId ? 'Edit Item' : 'New Item'}</h3>
          <form onSubmit={handleSave} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Name" required>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className={inputCls} placeholder="Nyama Choma Platter" />
              </Field>
              <Field label="Price" required>
                <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className={inputCls} placeholder="Ksh 1,500" />
              </Field>
            </div>
            <Field label="Description">
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={inputCls + ' resize-none'} placeholder="Short description…" />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Category">
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Sort Order">
                <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className={inputCls} />
              </Field>
            </div>
            <Field label="Image URL">
              <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className={inputCls} placeholder="https://…" />
            </Field>
            <Field label="Or upload image">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="font-sans text-sm text-gray-600" />
              {uploading && <span className="font-sans text-xs text-gray-400 ml-2">Uploading…</span>}
            </Field>
            {form.imageUrl && <img src={form.imageUrl} alt="" className="w-24 h-24 rounded-xl object-cover" />}
            <div className="flex gap-3 pt-2">
              <button type="submit" className="bg-[#2B2D3A] text-white font-sans text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#1e2030] transition-colors">Save</button>
              <button type="button" onClick={cancel} className="font-sans text-sm text-gray-500 hover:text-gray-700 px-3 py-2">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {items.length === 0 && <p className="font-sans text-sm text-gray-400">No items yet. Add your first menu item.</p>}
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 items-center">
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="font-serif font-bold text-[#2B2D3A] truncate">{item.name}</p>
              <p className="font-sans text-xs text-gray-400">{item.category} · {item.price} · order: {item.order}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(item)} className="font-sans text-xs text-[#D89B3F] hover:text-[#c4882e] font-semibold">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="font-sans text-xs text-red-400 hover:text-red-600 font-semibold">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Business Info ───────────────────────────────────────────────────── */

function BusinessTab() {
  const defaultForm = {
    name: siteConfig.name,
    about: siteConfig.about || '',
    address: siteConfig.address,
    phone: siteConfig.phone,
    whatsapp: siteConfig.whatsapp,
    'hours.weekdays': siteConfig.hours.weekdays,
    'hours.weekends': siteConfig.hours.weekends,
    mapEmbedUrl: siteConfig.mapsEmbed,
  }
  const [form, setForm] = useState(defaultForm)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getDoc(doc(db, 'businessInfo', 'main'))
      .then((d) => {
        if (d.exists()) {
          const data = d.data()
          setForm({
            name: data.name || '',
            about: data.about || '',
            address: data.address || '',
            phone: data.phone || '',
            whatsapp: data.whatsapp || '',
            'hours.weekdays': data.hours?.weekdays || '',
            'hours.weekends': data.hours?.weekends || '',
            mapEmbedUrl: data.mapEmbedUrl || '',
          })
        }
      })
      .catch(() => {})
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await setDoc(doc(db, 'businessInfo', 'main'), {
        name: form.name,
        about: form.about,
        address: form.address,
        phone: form.phone,
        whatsapp: form.whatsapp,
        hours: { weekdays: form['hours.weekdays'], weekends: form['hours.weekends'] },
        mapEmbedUrl: form.mapEmbedUrl,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-[#2B2D3A] mb-4">Business Info</h2>
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <form onSubmit={handleSave} className="space-y-3">
          <Field label="Restaurant Name">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
          </Field>
          <Field label="About (shown on About page)">
            <textarea value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} rows={4} className={inputCls + ' resize-none'} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Phone">
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="+254 7XX XXX XXX" />
            </Field>
            <Field label="WhatsApp Number (no + or spaces)">
              <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className={inputCls} placeholder="254712345678" />
            </Field>
          </div>
          <Field label="Address">
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputCls} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Hours Mon-Fri">
              <input value={form['hours.weekdays']} onChange={(e) => setForm({ ...form, 'hours.weekdays': e.target.value })} className={inputCls} placeholder="11:00 AM - 10:00 PM" />
            </Field>
            <Field label="Hours Sat-Sun">
              <input value={form['hours.weekends']} onChange={(e) => setForm({ ...form, 'hours.weekends': e.target.value })} className={inputCls} placeholder="10:00 AM - 11:00 PM" />
            </Field>
          </div>
          <Field label="Google Maps Embed URL">
            <input value={form.mapEmbedUrl} onChange={(e) => setForm({ ...form, mapEmbedUrl: e.target.value })} className={inputCls} placeholder="https://www.google.com/maps/embed?…" />
          </Field>
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-[#2B2D3A] text-white font-sans text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#1e2030] transition-colors disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
            {saved && <span className="font-sans text-sm text-green-600">Saved!</span>}
          </div>
        </form>
      </div>
    </div>
  )
}

/* ─── Gallery Manager ─────────────────────────────────────────────────── */

function GalleryTab() {
  const [images, setImages] = useState([])
  const [form, setForm] = useState({ imageUrl: '', caption: '', order: 0 })
  const [uploading, setUploading] = useState(false)

  const load = async () => {
    const snap = await getDocs(query(collection(db, 'gallery'), orderBy('order')))
    setImages(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  }

  useEffect(() => { load() }, [])

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setForm((f) => ({ ...f, imageUrl: url }))
    } finally {
      setUploading(false)
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    await addDoc(collection(db, 'gallery'), { ...form, order: Number(form.order) })
    setForm({ imageUrl: '', caption: '', order: 0 })
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Remove this image?')) return
    await deleteDoc(doc(db, 'gallery', id))
    load()
  }

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-[#2B2D3A] mb-4">Gallery</h2>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-serif text-base font-bold text-[#2B2D3A] mb-3">Add Image</h3>
        <form onSubmit={handleAdd} className="space-y-3">
          <Field label="Image URL">
            <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className={inputCls} placeholder="https://…" />
          </Field>
          <Field label="Or upload image">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="font-sans text-sm text-gray-600" />
            {uploading && <span className="font-sans text-xs text-gray-400 ml-2">Uploading…</span>}
          </Field>
          {form.imageUrl && <img src={form.imageUrl} alt="" className="w-24 h-24 rounded-xl object-cover" />}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Caption">
              <input value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className={inputCls} placeholder="Warm dining ambiance" />
            </Field>
            <Field label="Sort Order">
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className={inputCls} />
            </Field>
          </div>
          <button type="submit" className="bg-[#D89B3F] text-white font-sans text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#c4882e] transition-colors">
            Add Image
          </button>
        </form>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.length === 0 && <p className="col-span-4 font-sans text-sm text-gray-400">No images yet.</p>}
        {images.map((img) => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
            <img src={img.imageUrl} alt={img.caption} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
              <p className="font-sans text-white text-xs text-center line-clamp-2">{img.caption}</p>
              <button onClick={() => handleDelete(img.id)} className="font-sans text-xs text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Shared helpers ──────────────────────────────────────────────────── */

const inputCls = 'w-full border border-gray-200 rounded-xl px-3 py-2 font-sans text-sm text-[#2B2D3A] focus:outline-none focus:ring-2 focus:ring-[#D89B3F]/50 focus:border-[#D89B3F] transition-colors'

function Field({ label, required, children }) {
  return (
    <div>
      <label className="font-sans text-sm font-medium text-[#2B2D3A] block mb-1">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
