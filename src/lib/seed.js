// All the "creator" copy and demo content lives here so a buyer can
// rebrand the whole site by editing one file.

export const CREATOR = {
  name: 'Remy Vale',
  role: 'Photographer & Creator',
  handle: '@remyvale',
  tagline: 'Light, motion, and a little bit of magic.',
  location: 'Pittsburgh, PA',
  email: 'hello@remyvale.com',
  avatar: 'https://picsum.photos/seed/remy-portrait/320/320',
  heroPhoto: 'https://picsum.photos/seed/remy-hero/900/1125',
  bioPhoto: 'https://picsum.photos/seed/remy-bio/900/900',
  bookPhoto: 'https://picsum.photos/seed/remy-book/900/900',
  socials: ['Instagram', 'TikTok', 'YouTube', 'Pinterest'],
}

// Selling points shown on the home page — these are the "amenities"
// you're pitching to creators who currently live on Linktree.
export const FEATURES = [
  {
    title: 'Your own links page',
    body: 'A Linktree-style hub that lives on your domain, not a rented page. Pinned covers, photo thumbnails, and you control every link.',
  },
  {
    title: 'Built-in booking',
    body: 'Let clients request sessions straight from your site. Inquiries land in your inbox and your private dashboard automatically.',
  },
  {
    title: 'A real portfolio',
    body: 'Show your work the way it deserves — full-bleed imagery and an about page that actually sounds like you.',
  },
  {
    title: 'You own the audience',
    body: 'Your domain, your email list, your analytics. No algorithm deciding who sees your link.',
  },
  {
    title: 'Edit it yourself',
    body: 'A simple admin panel. Add a link, upload a cover, pin a feature — no developer, no monthly link tax.',
  },
  {
    title: 'Made to convert',
    body: 'Every page points somewhere: to a booking, a shop, a follow. Designed to turn visitors into clients.',
  },
]

export const MARQUEE = ['Editorial', 'Brand Work', 'Weddings', 'Portraits', 'Travel', 'Content Days']

// Demo links — shown when the backend has no data yet.
export const SEED_LINKS = [
  {
    id: 's1',
    title: 'Spring Editorial — Full Gallery',
    subtitle: 'My favorite shoot of the year',
    url: 'https://example.com/spring-editorial',
    image: 'https://picsum.photos/seed/edit-spring/640/400',
    pinned: true,
    position: 0,
  },
  {
    id: 's2',
    title: 'Book a Session',
    subtitle: 'Portraits, brand & editorial',
    url: 'https://example.com/book',
    image: 'https://picsum.photos/seed/book-cover/640/400',
    pinned: true,
    position: 1,
  },
  {
    id: 's3',
    title: 'Instagram',
    subtitle: '@remyvale · 84k followers',
    url: 'https://instagram.com',
    image: 'https://picsum.photos/seed/ig-thumb/200/200',
    pinned: false,
    position: 2,
  },
  {
    id: 's4',
    title: 'The Contact Sheet — Newsletter',
    subtitle: 'Behind every shoot, twice a month',
    url: 'https://example.com/newsletter',
    image: 'https://picsum.photos/seed/news-thumb/200/200',
    pinned: false,
    position: 3,
  },
  {
    id: 's5',
    title: 'Print Shop',
    subtitle: 'Limited fine-art prints',
    url: 'https://example.com/shop',
    image: 'https://picsum.photos/seed/shop-thumb/200/200',
    pinned: false,
    position: 4,
  },
  {
    id: 's6',
    title: 'YouTube — Behind the Lens',
    subtitle: 'Gear, edits & shoot vlogs',
    url: 'https://youtube.com',
    image: '',
    pinned: false,
    position: 5,
  },
]
