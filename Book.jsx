import { Link } from 'react-router-dom'
import { CREATOR } from '../lib/seed.js'
import { ArrowUpRight } from '../components/Icons.jsx'

const PACKAGES = [
  {
    name: 'Brand Session',
    price: '$650',
    blurb: 'A focused half-day for local businesses — photo and short-form video to fill your site and feed.',
    items: ['2–3 hour session', '1 location', '40 edited photos', '3 social reels', 'Usage rights'],
  },
  {
    name: 'Wedding Day',
    price: '$2,800',
    blurb: 'Full film and photography coverage for the whole day, from first look to last dance.',
    items: ['8 hours coverage', 'Two shooters', 'Highlight film', '400+ edited photos', 'Online gallery'],
    featured: true,
  },
  {
    name: 'Event Coverage',
    price: 'From $500',
    blurb: 'Launches, markets, fundraisers, and live events — captured as they happen, priced by the hour.',
    items: ['Hourly coverage', 'Photo and/or video', 'Fast social clips', 'Full edited gallery'],
  },
]

export default function Book() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <p className="eyebrow">Book a shoot</p>
          <h1 className="display" style={{ maxWidth: '18ch' }}>Pick a package. Pick a date. Let's shoot.</h1>
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
          <h2 className="display" style={{ maxWidth: '20ch', margin: '0 auto' }}>Not sure which fits? Tell us about your project.</h2>
          <p className="lede" style={{ margin: '16px auto 0' }}>We reply to every inquiry within a day.</p>
          <Link to="/contact" className="btn btn--coral mt-m">Send an inquiry <ArrowUpRight /></Link>
        </div>
      </section>
    </>
  )
}
