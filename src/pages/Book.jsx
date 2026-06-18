import { Link } from 'react-router-dom'
import { CREATOR } from '../lib/seed.js'
import { ArrowUpRight } from '../components/Icons.jsx'

const PACKAGES = [
  {
    name: 'The Mini',
    price: '$350',
    blurb: 'A focused 45-minute session. Perfect for headshots, a content refresh, or a single look.',
    items: ['45-minute session', '1 location', '15 edited images', '48-hour gallery'],
  },
  {
    name: 'The Brand Day',
    price: '$950',
    blurb: 'A half-day built for creators and small brands who need a library of content to last.',
    items: ['4-hour session', 'Up to 3 looks/locations', '60 edited images', 'Reels & stills', 'Usage rights'],
    featured: true,
  },
  {
    name: 'The Editorial',
    price: "Let's talk",
    blurb: 'Full-scale concepting and production for campaigns, lookbooks, and editorial features.',
    items: ['Concept & moodboard', 'Full production day', 'Team coordination', 'Delivery to spec'],
  },
]

export default function Book() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <p className="eyebrow">Book a session</p>
          <h1 className="display" style={{ maxWidth: '16ch' }}>Pick a package. Pick a date. Let's shoot.</h1>
        </div>
      </div>

      <section className="section">
        <div className="wrap features__grid">
          {PACKAGES.map((p) => (
            <article
              className="feature"
              key={p.name}
              style={p.featured ? { borderColor: 'var(--coral)', borderWidth: 2 } : undefined}
            >
              {p.featured && <span className="feature__num">Most booked</span>}
              <h3 style={{ marginTop: p.featured ? 16 : 0 }}>{p.name}</h3>
              <div className="display" style={{ fontSize: '2rem', color: 'var(--coral)', margin: '4px 0 12px' }}>{p.price}</div>
              <p style={{ marginBottom: 16 }}>{p.blurb}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', fontSize: 14, color: 'var(--ink-soft)' }}>
                {p.items.map((i) => (
                  <li key={i} style={{ padding: '5px 0', borderTop: '1px solid var(--line)' }}>{i}</li>
                ))}
              </ul>
              <Link to="/contact" className={`btn btn--sm ${p.featured ? 'btn--coral' : 'btn--ghost'}`} style={{ width: '100%', justifyContent: 'center' }}>
                Request this <ArrowUpRight />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tight center" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <h2 className="display" style={{ maxWidth: '18ch', margin: '0 auto' }}>Not sure which is right? Tell me about your project.</h2>
          <p className="lede" style={{ margin: '16px auto 0' }}>I reply to every inquiry within a day, {CREATOR.name.split(' ')[0]} promise.</p>
          <Link to="/contact" className="btn btn--coral mt-m">Send an inquiry <ArrowUpRight /></Link>
        </div>
      </section>
    </>
  )
}
