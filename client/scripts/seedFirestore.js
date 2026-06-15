/**
 * Seed script — populates Firestore with starter data from siteConfig.
 *
 * Usage (from the client/ directory):
 *   node --env-file=.env scripts/seedFirestore.js
 *
 * Requires Node 20.6+ for --env-file support.
 * Alternatively: set VITE_FIREBASE_* env vars manually before running.
 *
 * WARNING: This will OVERWRITE existing businessInfo/main and ADD to
 * menuItems/gallery. Run once on a fresh project.
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

/* ─── Seed data ────────────────────────────────────────────────────────── */

const businessInfo = {
  name: 'Jiko House',
  about:
    'Jiko House started with a single charcoal jiko in a backyard in Westlands. Our founder, Chef Amani Njoroge, spent two decades perfecting slow-smoked BBQ and brought it home to Nairobi in 2016. Every rack of ribs still goes over hardwood. Every sauce is still made from scratch.',
  address: 'Westlands Square, Nairobi, Kenya',
  phone: '+254 712 345 678',
  whatsapp: '254712345678',
  hours: {
    weekdays: '11:00 AM - 10:00 PM',
    weekends: '10:00 AM - 11:00 PM',
  },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8175!2d36.8035!3d-1.2634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTUnNDYuMiJTIDM2wrA0OCcxMi42IkU!5e0!3m2!1sen!2ske!4v1700000000000',
}

const menuItems = [
  { name: 'Fivefold Smoke Slow', price: 'Ksh 6,000', description: 'A magnificent rack of slow-smoked beef ribs rubbed with our secret 12-spice blend, glazed with tamarind BBQ sauce.', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80', category: 'mains', order: 1 },
  { name: 'Pork Ribs', price: 'Ksh 1,800', description: 'Tender fall-off-the-bone pork ribs glazed with smoky honey chipotle sauce, served with coleslaw and grilled corn.', imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80', category: 'mains', order: 2 },
  { name: 'Brisket', price: 'Ksh 2,000', description: 'Texas-style 14-hour smoked beef brisket, sliced thick and served with pickles, onions, and house-made BBQ sauce.', imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80', category: 'mains', order: 3 },
  { name: 'Big Kuku Burger', price: 'Ksh 1,200', description: 'Double smash-pressed chicken patty, pepper jack cheese, caramelised onions, jalapeño slaw in a brioche bun.', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', category: 'mains', order: 4 },
  { name: 'Brisket Sandwich', price: 'Ksh 1,400', description: 'Pulled brisket piled high on a toasted ciabatta roll with smoky aioli, pickled red onions, and arugula.', imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80', category: 'mains', order: 5 },
  { name: 'Nyama Choma Platter', price: 'Ksh 3,500', description: 'A sharing platter of char-grilled goat, beef, and chicken served with kachumbari, ugali, and sukuma wiki.', imageUrl: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800&q=80', category: 'mains', order: 6 },
  { name: 'Grilled Halloumi Salad', price: 'Ksh 800', description: 'Golden grilled halloumi, mixed greens, sun-dried tomatoes, cucumber, and a lemon-oregano vinaigrette.', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', category: 'salads', order: 10 },
  { name: 'Avocado Caesar', price: 'Ksh 750', description: 'Crisp romaine, house-made Caesar dressing, parmesan crisp, croutons, and ripe Kenyan avocado.', imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80', category: 'salads', order: 11 },
  { name: 'Watermelon Feta', price: 'Ksh 700', description: 'Chilled watermelon, crumbled feta, fresh mint, arugula, toasted pumpkin seeds, and balsamic glaze.', imageUrl: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=800&q=80', category: 'salads', order: 12 },
  { name: 'Tamarind Lemonade', price: 'Ksh 350', description: 'Tangy tamarind concentrate blended with fresh lemon juice, cane sugar, and sparkling water. Served over ice.', imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80', category: 'beverages', order: 20 },
  { name: 'Smoky Hibiscus Cooler', price: 'Ksh 380', description: 'House-brewed hibiscus tea with a hint of smoked salt, honey, lime, and ginger beer.', imageUrl: 'https://images.unsplash.com/photo-1534353341670-a18cb90e66df?w=800&q=80', category: 'beverages', order: 21 },
  { name: 'Fresh Sugarcane Juice', price: 'Ksh 280', description: "Cold-pressed sugarcane with lemon and ginger. Nairobi's classic street refresher, elevated.", imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80', category: 'beverages', order: 22 },
  { name: 'Mandazi Beignets', price: 'Ksh 500', description: 'Pillowy Swahili-style mandazi dusted with cardamom sugar, served with mango coulis and vanilla cream.', imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80', category: 'desserts', order: 30 },
  { name: 'Chocolate Lava Cake', price: 'Ksh 650', description: 'Warm dark-chocolate fondant with a molten centre, served with salted caramel ice cream and praline shards.', imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80', category: 'desserts', order: 31 },
  { name: 'Passion Fruit Panna Cotta', price: 'Ksh 580', description: 'Silky Italian-style panna cotta with a vibrant Kenyan passion-fruit compote and toasted coconut flakes.', imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80', category: 'desserts', order: 32 },
]

const galleryItems = [
  { imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', caption: 'Elegant restaurant interior', order: 1 },
  { imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80', caption: 'Slow-smoked beef ribs', order: 2 },
  { imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80', caption: 'Pork ribs platter', order: 3 },
  { imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', caption: 'Warm restaurant ambiance', order: 4 },
  { imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80', caption: 'Smoked brisket', order: 5 },
  { imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', caption: 'Signature burger', order: 6 },
  { imageUrl: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80', caption: 'Chef at work', order: 7 },
  { imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', caption: 'Dining area by night', order: 8 },
  { imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80', caption: 'Wood-fired dishes', order: 9 },
  { imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80', caption: 'Craft cocktails', order: 10 },
  { imageUrl: 'https://images.unsplash.com/photo-1484723091739-30990ff8ebe3?w=800&q=80', caption: 'French toast dessert', order: 11 },
  { imageUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80', caption: 'Private dining setup', order: 12 },
]

/* ─── Run ──────────────────────────────────────────────────────────────── */

async function seed() {
  console.log('Seeding Firestore…')

  // businessInfo/main
  await setDoc(doc(db, 'businessInfo', 'main'), businessInfo)
  console.log('✓ businessInfo/main written')

  // menuItems
  for (const item of menuItems) {
    await addDoc(collection(db, 'menuItems'), item)
  }
  console.log(`✓ ${menuItems.length} menuItems written`)

  // gallery
  for (const img of galleryItems) {
    await addDoc(collection(db, 'gallery'), img)
  }
  console.log(`✓ ${galleryItems.length} gallery images written`)

  console.log('\nDone! Your Firestore is seeded.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
