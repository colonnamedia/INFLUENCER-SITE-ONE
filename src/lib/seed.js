// Demo content for the creator/influencer template.
// Keep personal-brand copy in this file so the template can be rebranded quickly.

export const SITE_TITLE = '“Influencer” Creator'

export const CREATOR = {
  name: 'Influencer Creator',
  role: 'Content Creation · Social Media · Events',
  handle: '@yourhandle',
  tagline: 'Professional content built to make your business, brand, event or special occasion stand out — from social media and UGC to weddings, launches and unforgettable moments.',
  location: 'Available locally · Available worldwide',
  email: 'hello@yourbrand.com',
  avatar: 'https://images.unsplash.com/photo-1758273239330-9f32922ead06?auto=format&fit=crop&w=700&q=82',
  heroPhoto: 'https://images.unsplash.com/photo-1759393851752-47a6ced4f604?auto=format&fit=crop&w=1400&q=84',
  bioPhoto: 'https://images.unsplash.com/photo-1758521540376-23c1b2f592d9?auto=format&fit=crop&w=1200&q=84',
  bookPhoto: 'https://images.unsplash.com/photo-1758273239330-9f32922ead06?auto=format&fit=crop&w=1200&q=84',
  socials: ['Instagram', 'TikTok', 'YouTube', 'Pinterest'],
}

export const GALLERY = {
  embedUrl: '',
  embedLabel: 'Paste your Pic-Time, Pixieset, SmugMug, CloudSpot, Zenfolio or other gallery embed URL here.',
  images: [
    { src: 'https://images.unsplash.com/photo-1759393851752-47a6ced4f604?auto=format&fit=crop&w=1000&q=80', alt: 'Creator filming vertical video in a bright office' },
    { src: 'https://images.unsplash.com/photo-1758273239330-9f32922ead06?auto=format&fit=crop&w=1000&q=80', alt: 'Lifestyle creator filming at home' },
    { src: 'https://images.unsplash.com/photo-1758521540376-23c1b2f592d9?auto=format&fit=crop&w=1000&q=80', alt: 'Creator recording wardrobe content with a camera' },
    { src: 'https://images.unsplash.com/photo-1758273239330-9f32922ead06?auto=format&fit=crop&w=1000&q=80&sat=-15', alt: 'Creator studio content placeholder' },
    { src: 'https://images.unsplash.com/photo-1759393851752-47a6ced4f604?auto=format&fit=crop&w=1000&q=80&sat=10', alt: 'Social content creator placeholder' },
    { src: 'https://images.unsplash.com/photo-1758521540376-23c1b2f592d9?auto=format&fit=crop&w=1000&q=80&sat=5', alt: 'Brand collaboration content placeholder' },
  ],
}

export const FEATURES = [
  { title: 'Business Content', body: 'Professional photo and video content for businesses that need stronger websites, social media, ads, launches and everyday brand storytelling.' },
  { title: 'Social & UGC', body: 'Vertical video, product demos, testimonials, reels and social-first assets designed for organic content and paid campaigns.' },
  { title: 'Events & Occasions', body: 'Content for weddings, celebrations, launches, parties and special moments — captured in a modern, shareable style.' },
  { title: 'Lifestyle & Travel', body: 'Story-led photo and video content covering places, experiences, routines, destinations and memorable moments.' },
  { title: 'Brand Partnerships', body: 'Campaigns and collaborations that connect businesses, products and creators with audiences through authentic content.' },
  { title: 'Creative Direction', body: 'Concepting, shot planning and content direction to make sure every project has a strong look, message and purpose.' },
]

export const MARQUEE = ['Business', 'Brands', 'Events', 'Weddings', 'Social', 'UGC', 'Lifestyle', 'Content']
export const PORTFOLIO = []

export const SEED_LINKS = [
  { id: 's1', title: 'View Our Latest Work', subtitle: 'Business, social + special occasions', url: 'https://example.com/gallery', image: CREATOR.heroPhoto, pinned: true, position: 0 },
  { id: 's2', title: 'Work With Us', subtitle: 'Content creation + collaborations', url: 'https://example.com/work-with-us', image: CREATOR.bookPhoto, pinned: true, position: 1 },
  { id: 's3', title: 'Instagram', subtitle: '@yourhandle · latest content', url: 'https://instagram.com', image: CREATOR.avatar, pinned: false, position: 2 },
  { id: 's4', title: 'TikTok', subtitle: 'Short-form content + behind the scenes', url: 'https://tiktok.com', image: CREATOR.bioPhoto, pinned: false, position: 3 },
  { id: 's5', title: 'YouTube', subtitle: 'Projects, stories + behind the scenes', url: 'https://youtube.com', image: CREATOR.heroPhoto, pinned: false, position: 4 },
  { id: 's6', title: 'Media Kit', subtitle: 'Services, audience + partnership details', url: 'https://example.com/media-kit.pdf', image: '', pinned: false, position: 5 },
]
