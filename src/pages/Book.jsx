import { Link } from 'react-router-dom'
import { ArrowUpRight } from '../components/Icons.jsx'

const PACKAGES = [
  {
    name: 'UGC Starter',
    price: 'From $450',
    blurb: 'A focused content package for a product, launch or paid-social test.',
    items: ['2 vertical videos', '3 hook variations', 'Raw + edited delivery', 'Organic usage included'],
  },
  {
    name: 'Creator Campaign',
    price: 'Custom',
    blurb: 'A creator-led partnership built for reach, trust and content that belongs in the feed.',
    items: ['Campaign concept', 'Reel or TikTok', 'Story sequence', 'Performance recap', 'Usage options'],
    featured: true,
  },
  {
    name: 'Ongoing Partner',
    price: 'Monthly',
    blurb: 'Recurring content for brands that want consistency instead of one-and-done creator posts.',
    items: ['Monthly content plan', 'UGC + posted content', 'Priority scheduling', 'Creative testing', 'Quarterly review'],
  },
]

export default function Book() {
  return (
    <>
      <div className="pagehead creator-pagehead">
        <div className="wrap">
          <span className="creator-kicker">Partnerships</span>
          <h1 className="display" style={{ maxWidth: '16ch' }}>Let’s create something people actually want to watch.</h1>
        </div>
      </div>

      <section className="section creator-package-section">
        <div className="wrap features__grid">
          {PACKAGES.map((p) => (
            <article className="feature creator-package" key={p.name} style={p.featured ? { borderColor: 'var(--creator-pink)', borderWidth: 2 } : undefined}>
              {p.featured && <span className="feature__num">Most popular</span>}
              <h3 style={{ marginTop: p.featured ? 16 : 0 }}>{p.name}</h3>
              <div className="display" style={{ fontSize: '2rem', margin: '4px 0 12px' }}>{p.price}</div>
              <p style={{ marginBottom: 16 }}>{p.blurb}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', fontSize: 14, color: 'var(--ink-soft)' }}>
                {p.items.map((i) => <li key={i} style={{ padding: '7px 0', borderTop: '1px solid var(--line)' }}>{i}</li>)}
              </ul>
              <Link to="/contact" className={`btn btn--sm ${p.featured ? 'creator-primary' : 'btn--ghost'}`} style={{ width: '100%', justifyContent: 'center' }}>
                Start a conversation <ArrowUpRight />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tight center creator-proof">
        <div className="wrap">
          <h2 className="display" style={{ maxWidth: '20ch', margin: '0 auto' }}>Need a custom mix of content, usage and posting?</h2>
          <p className="lede" style={{ margin: '16px auto 0' }}>Send the campaign details and we can build the right scope around the idea.</p>
          <Link to="/contact" className="btn creator-primary mt-m">Send an inquiry <ArrowUpRight /></Link>
        </div>
      </section>
    </>
  )
}
