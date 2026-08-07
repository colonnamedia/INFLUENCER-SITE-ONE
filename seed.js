// All studio copy and demo content lives here so a buyer can rebrand the
// whole site by editing one file.
//
// Images live in /public/images and are referenced by absolute path (e.g.
// "/images/hero.jpg"). Drop your own photos in with the same names — or point
// these fields at any hosted URL (Cloudinary, etc.) — and they just work.

export const CREATOR = {
  name: 'Northlight Studio',
  role: 'Content & Media Studio',
  handle: '@northlightstudio',
  tagline: 'Photography and video for the local businesses, weddings, and events that make a place feel like home.',
  location: 'Pittsburgh, PA',
  email: 'hello@northlightstudio.com',
  avatar: '/images/logo.jpg',
  heroPhoto: '/images/hero.jpg',
  bioPhoto: '/images/about.jpg',
  bookPhoto: '/images/book.jpg',
  socials: ['Instagram', 'TikTok', 'YouTube', 'Pinterest'],
}

// What the studio offers — shown on the home page.
export const FEATURES = [
  {
    title: 'Brand & business',
    body: 'Photo and video that make local shops, restaurants, and professionals look as good online as they do in person.',
  },
  {
    title: 'Weddings',
    body: 'Documentary-style films and photography that capture the whole day — the vows, the toasts, and everything between.',
  },
  {
    title: 'Events',
    body: 'Launches, markets, fundraisers, live music. We capture the room as it actually feels, start to finish.',
  },
  {
    title: 'Social content',
    body: 'Reels and short-form built for the feed — a half-day shoot that keeps your grid full for a month.',
  },
  {
    title: 'Product & food',
    body: 'Bright, appetizing stills that sell the plate and the product, ready for menus, sites, and ads.',
  },
  {
    title: 'Same-week delivery',
    body: 'A local studio with local turnaround. Your gallery lands in days, not the month everyone else makes you wait.',
  },
]

export const MARQUEE = ['Local Business', 'Weddings', 'Events', 'Brand Films', 'Reels', 'Portraits']

// Selected work — a categorized portfolio. Categories drive the home-page filter.
// (Use 'Business', 'Weddings', or 'Events'.)
export const PORTFOLIO = [
  { id: 'w1', title: 'Corner Bakery — Brand Refresh', category: 'Business', image: '/images/portfolio/business-bakery.jpg' },
  { id: 'w2', title: 'Maya & Theo — Riverside Wedding', category: 'Weddings', image: '/images/portfolio/wedding-riverside.jpg' },
  { id: 'w3', title: 'Summer Night Market', category: 'Events', image: '/images/portfolio/event-market.jpg' },
  { id: 'w4', title: 'Ironline Barbershop', category: 'Business', image: '/images/portfolio/business-barber.jpg' },
  { id: 'w5', title: 'Priya & Sam — Vineyard Ceremony', category: 'Weddings', image: '/images/portfolio/wedding-vineyard.jpg' },
  { id: 'w6', title: 'Gallery Opening Night', category: 'Events', image: '/images/portfolio/event-gallery.jpg' },
  { id: 'w7', title: 'Bloom Floral Co. — Product', category: 'Business', image: '/images/portfolio/business-floral.jpg' },
  { id: 'w8', title: 'The Rooftop Reception', category: 'Weddings', image: '/images/portfolio/wedding-rooftop.jpg' },
  { id: 'w9', title: 'Fall Charity 5K', category: 'Events', image: '/images/portfolio/event-5k.jpg' },
]

// Demo links — shown when the backend has no data yet. Once you connect the
// database and add links in the admin, those replace these.
export const SEED_LINKS = [
  {
    id: 's1',
    title: 'See Our Work — Full Portfolio',
    subtitle: 'Business, weddings & events',
    url: 'https://example.com/portfolio',
    image: '/images/links/work.jpg',
    pinned: true,
    position: 0,
  },
  {
    id: 's2',
    title: 'Book a Shoot',
    subtitle: 'Check dates & packages',
    url: 'https://example.com/book',
    image: '/images/links/book.jpg',
    pinned: true,
    position: 1,
  },
  {
    id: 's3',
    title: 'Instagram',
    subtitle: '@northlightstudio · daily work',
    url: 'https://instagram.com',
    image: '/images/links/instagram.jpg',
    pinned: false,
    position: 2,
  },
  {
    id: 's4',
    title: 'Latest Wedding Film',
    subtitle: 'Watch the highlight reel',
    url: 'https://example.com/film',
    image: '/images/links/film.jpg',
    pinned: false,
    position: 3,
  },
  {
    id: 's5',
    title: 'Google Reviews',
    subtitle: '5.0 from local clients',
    url: 'https://google.com',
    image: '/images/links/reviews.jpg',
    pinned: false,
    position: 4,
  },
  {
    id: 's6',
    title: 'Rate Sheet (PDF)',
    subtitle: 'Packages & à la carte pricing',
    url: 'https://example.com/rates.pdf',
    image: '',
    pinned: false,
    position: 5,
  },
]
