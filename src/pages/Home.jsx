import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CREATOR, FEATURES, MARQUEE } from '../lib/seed.js'
import { api } from '../lib/api.js'
import { PinnedCard, LinkRow } from '../components/LinkCard.jsx'
import { ArrowUpRight } from '../components/Icons.jsx'

const STATS = [
  ['125K+', 'community'],
  ['4.8M', 'monthly views'],
  ['7.2%', 'avg. engagement'],
]

export default function Home() {
  const [links, setLinks] = useState([])
  useEffect(() => { api.getLinks().then(setLinks) }, [])

  const pinned = links.filter((l) => l.pinned).slice(0, 2)
  const rows = links.filter((l) => !l.pinned).slice(0, 3)

  return (
    <>
      <header className="creator-hero">
        <div className="wrap creator-hero__grid">
          <div className="creator-hero__copy">
            <span className="creator-kicker">{CREATOR.role}</span>
            <h1>Content that feels <em>human.</em></h1>
            <p>{CREATOR.tagline}</p>
            <div className="creator-hero__actions">
              <Link to="/gallery" className="btn creator-primary">View the gallery <ArrowUpRight /></Link>
              <Link to="/book" className="btn btn--ghost creator-secondary">Work with me</Link>
            </div>
            <div className="creator-stats">
              {STATS.map(([value, label]) => (
                <div className="creator-stat" key={label}><strong>{value}</strong><span>{label}</span></div>
              ))}
            </div>
          </div>

          <div className="creator-showcase creator-showcase--photo" aria-label="Creator content preview">
            <div className="creator-photo-stack">
              <img className="creator-photo-stack__main" src={CREATOR.heroPhoto} alt="Content creator filming social content" />
              <img className="creator-photo-stack__small" src={CREATOR.bioPhoto} alt="Lifestyle creator filming with a camera" />
              <div className="creator-photo-stack__label"><span>Featured</span><strong>Creator campaign</strong><small>UGC · lifestyle · social</small></div>
            </div>
          </div>
        </div>
      </header>

      <div className="marquee creator-marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => <span className="marquee__item" key={i}>{m}</span>)}
        </div>
      </div>

      <section className="section creator-services">
        <div className="wrap">
          <div className="creator-section-head">
            <span className="creator-kicker">Create · connect · convert</span>
            <h2>Built for brands. Made for people.</h2>
            <p>From a one-off UGC asset to a long-term partnership, the template gives a creator room to show personality, credibility and what they actually offer.</p>
          </div>
          <div className="creator-service-grid">
            {FEATURES.map((f, i) => (
              <article className="creator-service" key={f.title}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section creator-links-preview">
        <div className="wrap creator-links-preview__grid">
          <div>
            <span className="creator-kicker">One link. Your whole world.</span>
            <h2>More than a Linktree.</h2>
            <p>Your own branded link hub for products, affiliate links, social channels, media kits, launches and whatever you want people to find next.</p>
            <Link to="/links" className="creator-text-link">Open the link hub <ArrowUpRight /></Link>
          </div>
          <div className="creator-link-stack">
            {pinned.length > 0 && <div className="pinned-grid">{pinned.map((l) => <PinnedCard key={l.id} link={l} />)}</div>}
            {rows.map((l) => <LinkRow key={l.id} link={l} />)}
            {links.length === 0 && <div className="creator-empty-preview">Add links from the owner dashboard and they’ll appear here automatically.</div>}
          </div>
        </div>
      </section>

      <section className="creator-collab">
        <div className="wrap creator-collab__inner">
          <span className="creator-kicker">Let’s make something worth watching</span>
          <h2>Have a product, place or story that fits?</h2>
          <p>Tell me what you’re building and what you want the audience to feel, remember or do.</p>
          <Link to="/book" className="btn creator-primary">Start a collaboration <ArrowUpRight /></Link>
        </div>
      </section>
    </>
  )
}
