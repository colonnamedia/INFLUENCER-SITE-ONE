// Demo content for the creator/influencer template.
// Keep personal-brand copy in this file so the template can be rebranded quickly.

export const SITE_TITLE = '“Influencer” Creator'

export const CREATOR = {
  name: 'Maya Lane',
  role: 'Lifestyle Creator · UGC · Partnerships',
  handle: '@mayalane',
  tagline: 'Everyday style, wellness, travel and the products I actually use — created for people and brands that value real connection.',
  location: 'Pittsburgh · Available worldwide',
  email: 'hello@mayalane.co',
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
  { title: 'Brand Partnerships', body: 'Thoughtful integrations, launches and campaigns built to feel native to the audience — not pasted into the feed.' },
  { title: 'UGC Content', body: 'Vertical video, product demos, testimonials and lifestyle assets brands can use across organic social and paid media.' },
  { title: 'Short-Form Video', body: 'Reels and TikToks with a strong hook, clear story and visual pacing designed for how people actually consume content.' },
  { title: 'Lifestyle & Travel', body: 'Story-led content covering places, routines, products and experiences through a relatable personal point of view.' },
  { title: 'Affiliate Features', body: 'Curated recommendations and shoppable favorites collected in one place so followers can find what they saw in content.' },
  { title: 'Creative Direction', body: 'Concepting, scripting and content planning for campaigns that need a creator perspective before the camera ever turns on.' },
]

export const MARQUEE = ['Creator', 'UGC', 'Lifestyle', 'Travel', 'Wellness', 'Style', 'Partnerships', 'Short-form']
export const PORTFOLIO = []

export const SEED_LINKS = [
  { id: 's1', title: 'Shop My Current Favorites', subtitle: 'Style, wellness + everyday finds', url: 'https://example.com/shop', image: CREATOR.heroPhoto, pinned: true, position: 0 },
  { id: 's2', title: 'Work With Me', subtitle: 'Partnerships, UGC + collaborations', url: 'https://example.com/work-with-me', image: CREATOR.bookPhoto, pinned: true, position: 1 },
  { id: 's3', title: 'Instagram', subtitle: '@mayalane · daily life + favorites', url: 'https://instagram.com', image: CREATOR.avatar, pinned: false, position: 2 },
  { id: 's4', title: 'TikTok', subtitle: 'New videos every week', url: 'https://tiktok.com', image: CREATOR.bioPhoto, pinned: false, position: 3 },
  { id: 's5', title: 'YouTube', subtitle: 'Long-form, travel + behind the scenes', url: 'https://youtube.com', image: CREATOR.heroPhoto, pinned: false, position: 4 },
  { id: 's6', title: 'Media Kit', subtitle: 'Audience, services + partnership details', url: 'https://example.com/media-kit.pdf', image: '', pinned: false, position: 5 },
]
