// Optional: load the demo links into your database so the admin shows
// content out of the box. Run with:  node db/seed.mjs
// Requires DATABASE_URL in your environment (or a .env loaded by your shell).

import { neon } from '@neondatabase/serverless'

const SEED = [
  { title: 'Spring Editorial — Full Gallery', subtitle: 'My favorite shoot of the year', url: 'https://example.com/spring-editorial', image: 'https://picsum.photos/seed/edit-spring/640/400', pinned: true },
  { title: 'Book a Session', subtitle: 'Portraits, brand & editorial', url: 'https://example.com/book', image: 'https://picsum.photos/seed/book-cover/640/400', pinned: true },
  { title: 'Instagram', subtitle: '@remyvale · 84k followers', url: 'https://instagram.com', image: 'https://picsum.photos/seed/ig-thumb/200/200', pinned: false },
  { title: 'The Contact Sheet — Newsletter', subtitle: 'Behind every shoot, twice a month', url: 'https://example.com/newsletter', image: 'https://picsum.photos/seed/news-thumb/200/200', pinned: false },
  { title: 'Print Shop', subtitle: 'Limited fine-art prints', url: 'https://example.com/shop', image: 'https://picsum.photos/seed/shop-thumb/200/200', pinned: false },
  { title: 'YouTube — Behind the Lens', subtitle: 'Gear, edits & shoot vlogs', url: 'https://youtube.com', image: '', pinned: false },
]

const sql = neon(process.env.DATABASE_URL)

for (let i = 0; i < SEED.length; i++) {
  const l = SEED[i]
  const id = 'lnk_' + Math.random().toString(36).slice(2, 10)
  await sql`INSERT INTO links (id, title, subtitle, url, image, pinned, position)
            VALUES (${id}, ${l.title}, ${l.subtitle}, ${l.url}, ${l.image}, ${l.pinned}, ${i})`
  console.log('seeded:', l.title)
}
console.log('Done.')
