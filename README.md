# Restaurant Starter Kit — Jaribu Tech

A production-ready restaurant website boilerplate built with **React + Tailwind + Firebase + Cloudinary**. Sell it, clone it, rebrand it. No backend required.

---

## What's Included

| Feature | Details |
|---|---|
| Public website | Home, About, Menu, Contact — fully responsive |
| WhatsApp ordering | Every "Reserve" and "Order" button opens a pre-filled WhatsApp chat |
| Admin panel | `/admin/dashboard` — manage menu, business info, gallery |
| Firebase Auth | Email/password login for the admin |
| Firestore | Live menu, gallery, and business info (public read, owner write) |
| Cloudinary | Image uploads from the admin panel — free CDN, no Firebase billing |
| Seed script | Populate Firestore with starter data in one command |

---

## Tech Stack & Costs

| Service | Plan | Monthly Cost |
|---|---|---|
| Firebase (Auth + Firestore) | Spark (free) | Ksh 0 |
| Cloudinary (image storage + CDN) | Free tier (25GB) | Ksh 0 |
| Vercel (hosting) | Hobby (free) | Ksh 0 |
| **Total running cost** | | **Ksh 0** |

> The client only pays your retainer. No hosting bills, no storage bills.

---

## Onboarding a New Client

Follow these steps every time you deploy this for a new restaurant.

### Step 1 — Clone & install

```bash
git clone <your-repo-url> client-name
cd client-name/client
npm install
```

---

### Step 2 — Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it (e.g. `mama-oliech-restaurant`)
3. Disable Google Analytics (not needed) → **Create project**

#### Enable Firestore
Firebase Console → **Firestore Database** → **Create database** → choose a region (e.g. `europe-west1`) → **Start in production mode**

#### Enable Authentication
Firebase Console → **Authentication** → **Get started** → **Email/Password** → Enable → **Save**

#### Create the admin user
Firebase Console → **Authentication** → **Users** → **Add user** → enter the client's admin email + a strong password → **Add user**

Copy the **UID** shown next to the user — you'll need it in Step 4.

#### Get the Firebase config
Firebase Console → **Project Settings** (gear icon) → **Your apps** → **Add app** → Web (`</>`) → register app → copy the config object.

---

### Step 3 — Create a Cloudinary account

1. Go to [cloudinary.com](https://cloudinary.com) → **Sign up free**
2. After login, note your **Cloud name** on the dashboard homepage
3. Go to **Settings** → **Access Keys** → copy your **API Key** and **API Secret**

> No upload preset needed — images are signed server-side so no unsigned preset is required.

---

### Step 4 — Configure environment variables

In the `client/` folder, copy the example file:

```bash
cp .env.example .env
```

Fill in `.env` with the values from Steps 2 and 3:

```env
# Firebase (client-side — VITE_ prefix required)
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc

# Cloudinary (server-side only — no VITE_ prefix, never exposed to browser)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret   ← keep this secret
```

> **Why no VITE_ prefix on Cloudinary?** Vite exposes any `VITE_*` variable in the browser bundle. The `CLOUDINARY_API_SECRET` must never reach the browser — it stays on the server inside the Vercel serverless function that signs each upload.

---

### Step 5 — Set Firestore security rules

Firebase Console → **Firestore** → **Rules** tab → replace everything with the following (paste the client's UID where indicated) → **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isOwner() {
      return request.auth != null && request.auth.uid == 'PASTE_CLIENT_UID_HERE';
    }
    match /menuItems/{doc} {
      allow read: if true;
      allow write: if isOwner();
    }
    match /gallery/{doc} {
      allow read: if true;
      allow write: if isOwner();
    }
    match /businessInfo/{doc} {
      allow read: if true;
      allow write: if isOwner();
    }
  }
}
```

---

### Step 6 — Update site content

Open `client/src/config/siteConfig.js` and update the defaults:

```js
export const siteConfig = {
  name: 'Client Restaurant Name',
  tagline: 'Their tagline here.',
  description: 'Short description shown on home page.',
  phone: '+254 7XX XXX XXX',
  whatsapp: '2547XXXXXXXX',   // no + or spaces
  email: 'hello@theirsite.co.ke',
  address: 'Their address, Nairobi, Kenya',
  ...
}
```

Also update `whatsappMessages` if the client wants custom pre-filled message text:

```js
export const whatsappMessages = {
  reserve: "Hi, I'd like to reserve a table for [date] at [time] for [party size] people.",
  order: (itemName) => `Hi, I'd like to order: ${itemName}`,
  general: "Hi, I'd like to chat.",
}
```

> These are the fallback values. Once the client updates their Business Info in the admin panel, the live site uses Firestore values instead.

---

---

### Step 7 — Seed Firestore with starter data

First, temporarily open Firestore rules to allow writes (Firebase Console → Firestore → Rules):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Run the seed (from the `client/` directory):

```bash
node --env-file=.env scripts/seedFirestore.js
```

Then **immediately restore the real rules** from Step 5.

---

### Step 8 — Deploy to Vercel

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo
3. Set **Root Directory** to `client`
4. Add all environment variables from your `.env` file under **Environment Variables**
5. Click **Deploy**

The `vercel.json` already handles client-side routing — no extra config needed.

---

### Step 9 — Hand off to client

Give the client:

- **Website URL** — their Vercel deployment URL (or custom domain)
- **Admin URL** — `https://their-site.vercel.app/admin/login`
- **Admin email + password** — what you set in Firebase Auth (Step 2)

**What the client can manage themselves via the admin panel:**
- Add, edit, delete menu items (with image uploads)
- Update their business name, address, phone, WhatsApp number, hours, map
- Add and delete gallery photos

---

## Customisation Checklist Per Client

- [ ] Firebase project created
- [ ] Firestore enabled
- [ ] Auth enabled + admin user created
- [ ] Cloudinary account created, API key + secret copied
- [ ] `.env` filled in
- [ ] Firestore rules set with correct UID
- [ ] `siteConfig.js` updated with client name, phone, WhatsApp
- [ ] Hero image (`client/public/hero.gif`) replaced with client's image/video
- [ ] Firestore seeded
- [ ] Deployed to Vercel
- [ ] Custom domain pointed (if applicable)
- [ ] Client given admin login credentials

---

## Project Structure

```
client/
├── public/
│   └── hero.gif              ← replace with client's hero image/video
├── scripts/
│   └── seedFirestore.js      ← one-time Firestore seed
├── src/
│   ├── components/           ← Navbar, Footer, Hero, MenuCard, WhatsAppButton
│   ├── config/
│   │   └── siteConfig.js     ← fallback content + WhatsApp message templates
│   ├── lib/
│   │   ├── firebase.js       ← Firebase init (Auth, Firestore)
│   │   └── cloudinary.js     ← Cloudinary upload helper
│   └── pages/
│       ├── Home.jsx
│       ├── About.jsx         ← includes gallery section
│       ├── Menu.jsx
│       ├── Contact.jsx
│       └── admin/
│           ├── Login.jsx
│           └── Dashboard.jsx ← Menu Manager, Business Info, Gallery tabs
├── .env.example              ← copy to .env and fill in
└── firestore.rules           ← paste into Firebase Console
```

---

## Firestore Collections

| Collection | Fields |
|---|---|
| `menuItems` | `name`, `price`, `description`, `category`, `imageUrl`, `order` |
| `gallery` | `imageUrl`, `caption`, `order` |
| `businessInfo/main` | `name`, `about`, `address`, `phone`, `whatsapp`, `hours.weekdays`, `hours.weekends`, `mapEmbedUrl` |

---

## WhatsApp Number Format

The `whatsapp` field must be digits only, no `+` or spaces:

```
✓  254712345678
✗  +254 712 345 678
```

---

## Replacing the Hero

The hero background is `client/public/hero.gif`. Replace it with any image or short looping video:

- **Supported:** `.gif`, `.jpg`, `.png`, `.mp4` (update the `<img>` tag in `Hero.jsx` to `<video>` if using mp4)
- **Recommended size:** 1920×1080, under 5MB for fast loading

---

## Frequently Asked Questions

**Can two clients share one Firebase project?**
No. Each client must have their own Firebase project and Cloudinary account so their data is isolated.

**What if the client wants a custom domain?**
In Vercel → Project → Settings → Domains → add their domain. Update Firebase Auth → Authorized domains to include the new domain.

**What if a client wants more categories on the menu?**
They add items with new category names via the admin panel. The Menu page groups by category automatically.

**Is there a limit on menu items or gallery photos?**
Firestore free tier allows 1GB storage and 50,000 reads/day — a restaurant would never hit this.

**Can the client change their WhatsApp number later?**
Yes — they update it in the admin panel under Business Info. The whole site re-reads it from Firestore.
