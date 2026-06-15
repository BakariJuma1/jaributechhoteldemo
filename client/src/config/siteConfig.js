export const siteConfig = {
  name: 'Jiko House',
  tagline: 'Come hungry, leave happy, and savor the unforgettable flavors of Jiko House.',
  description:
    'Loved by thousands across Nairobi. Jiko House brings the soul of authentic Kenyan BBQ - slow-smoked, fire-kissed, and always unforgettable.',
  phone: '+254 712 345 678',
  whatsapp: '254712345678',
  email: 'hello@jikohouse.co.ke',
  address: 'Westlands Square, Nairobi, Kenya',
  mpesa: {
    till: '123456',
    name: 'Jiko House Ltd',
  },
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8175!2d36.8035!3d-1.2634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTUnNDYuMiJTIDM2wrA0OCcxMi42IkU!5e0!3m2!1sen!2ske!4v1700000000000',
  socialLinks: {
    instagram: 'https://instagram.com/jikohouse',
    facebook: 'https://facebook.com/jikohouse',
    twitter: 'https://twitter.com/jikohouse',
  },
  hours: {
    weekdays: '11:00 AM - 10:00 PM',
    weekends: '10:00 AM - 11:00 PM',
  },
}

export const menuCategories = [
  {
    id: 'mains',
    label: 'Mains',
    items: [
      {
        name: 'Fivefold Smoke Slow',
        price: 'Ksh 6,000',
        description:
          'A magnificent rack of slow-smoked beef ribs rubbed with our secret 12-spice blend, glazed with tamarind BBQ sauce.',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
      },
      {
        name: 'Pork Ribs',
        price: 'Ksh 1,800',
        description:
          'Tender fall-off-the-bone pork ribs glazed with smoky honey chipotle sauce, served with coleslaw and grilled corn.',
        image:
          'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80',
      },
      {
        name: 'Brisket',
        price: 'Ksh 2,000',
        description:
          'Texas-style 14-hour smoked beef brisket, sliced thick and served with pickles, onions, and house-made BBQ sauce.',
        image:
          'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
      },
      {
        name: 'Big Kuku Burger',
        price: 'Ksh 1,200',
        description:
          'Double smash-pressed chicken patty, pepper jack cheese, caramelised onions, jalapeño slaw in a brioche bun.',
        image:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
      },
      {
        name: 'Brisket Sandwich',
        price: 'Ksh 1,400',
        description:
          'Pulled brisket piled high on a toasted ciabatta roll with smoky aioli, pickled red onions, and arugula.',
        image:
          'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80',
      },
      {
        name: 'Nyama Choma Platter',
        price: 'Ksh 3,500',
        description:
          'A sharing platter of char-grilled goat, beef, and chicken served with kachumbari, ugali, and sukuma wiki.',
        image:
          'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800&q=80',
      },
    ],
  },
  {
    id: 'salads',
    label: 'Salads',
    items: [
      {
        name: 'Grilled Halloumi Salad',
        price: 'Ksh 800',
        description:
          'Golden grilled halloumi, mixed greens, sun-dried tomatoes, cucumber, and a lemon-oregano vinaigrette.',
        image:
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
      },
      {
        name: 'Avocado Caesar',
        price: 'Ksh 750',
        description:
          'Crisp romaine, house-made Caesar dressing, parmesan crisp, croutons, and ripe Kenyan avocado.',
        image:
          'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80',
      },
      {
        name: 'Watermelon Feta',
        price: 'Ksh 700',
        description:
          'Chilled watermelon, crumbled feta, fresh mint, arugula, toasted pumpkin seeds, and balsamic glaze.',
        image:
          'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=800&q=80',
      },
    ],
  },
  {
    id: 'beverages',
    label: 'Beverages',
    items: [
      {
        name: 'Tamarind Lemonade',
        price: 'Ksh 350',
        description:
          'Tangy tamarind concentrate blended with fresh lemon juice, cane sugar, and sparkling water. Served over ice.',
        image:
          'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80',
      },
      {
        name: 'Smoky Hibiscus Cooler',
        price: 'Ksh 380',
        description:
          'House-brewed hibiscus tea with a hint of smoked salt, honey, lime, and ginger beer.',
        image:
          'https://images.unsplash.com/photo-1534353341670-a18cb90e66df?w=800&q=80',
      },
      {
        name: 'Fresh Sugarcane Juice',
        price: 'Ksh 280',
        description:
          'Cold-pressed sugarcane with lemon and ginger. Nairobi\'s classic street refresher, elevated.',
        image:
          'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80',
      },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    items: [
      {
        name: 'Mandazi Beignets',
        price: 'Ksh 500',
        description:
          'Pillowy Swahili-style mandazi dusted with cardamom sugar, served with mango coulis and vanilla cream.',
        image:
          'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
      },
      {
        name: 'Chocolate Lava Cake',
        price: 'Ksh 650',
        description:
          'Warm dark-chocolate fondant with a molten centre, served with salted caramel ice cream and praline shards.',
        image:
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      },
      {
        name: 'Passion Fruit Panna Cotta',
        price: 'Ksh 580',
        description:
          'Silky Italian-style panna cotta with a vibrant Kenyan passion-fruit compote and toasted coconut flakes.',
        image:
          'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
      },
    ],
  },
]

export const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    alt: 'Elegant restaurant interior',
    span: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    alt: 'Slow-smoked beef ribs',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80',
    alt: 'Pork ribs platter',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    alt: 'Warm restaurant ambiance',
    span: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
    alt: 'Smoked brisket',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    alt: 'Signature burger',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80',
    alt: 'Chef at work',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    alt: 'Dining area by night',
    span: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
    alt: 'Wood-fired dishes',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80',
    alt: 'Craft cocktails',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1484723091739-30990ff8ebe3?w=800&q=80',
    alt: 'French toast dessert',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
    alt: 'Private dining setup',
    span: '',
  },
]
