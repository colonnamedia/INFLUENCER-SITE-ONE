import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CREATOR, FEATURES, MARQUEE, PORTFOLIO } from '../lib/seed.js'
import { api } from '../lib/api.js'
import { PinnedCard, LinkRow } from '../components/LinkCard.jsx'
import { ArrowUpRight } from '../components/Icons.jsx'

const CATS = ['All', 'Business', 'Weddings', 'Events']

export default function Home() {
  const [links, setLinks] = useState([])
  const [cat, setCat] = useState('All')
  useEffect(() => { api.getLinks().then(setLinks) }, [])

  const pinned = links.filter((l) => l.pinned).slice(0, 2)
  const rows = links.filter((l) => !l.pinned).slice(0, 3)
  const work = cat === 'All' ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === cat)

  return (
    <>
      {/* Hero */}
      <header className="hero">
        <div className="wrap hero__grid">
          <div>
            <p className="eyebrow">{CREATOR.role} · {CREATOR.location}</p>
            <h1 className="hero__name">
              {CREATOR.name.split(' ')[0]} <em>{CREATOR.name.split(' ').slice(1).join(' ')}</em>
            </h1>
            <p className="hero__sub lede">{CREATOR.tagline} One local team for the photo and video your business, your wedding, or your event deserves.</p>
            <div className="hero__cta-row">
              <a href="#work" className="btn">See our work <ArrowUpRight /></a>
              <Link to="/book" className="btn btn--ghost">Book a shoot</Link>
            </div>
          </div>
          <div className="hero__media">
            <img className="hero__photo" src={CREATOR.heroPhoto} alt={`${CREATOR.name}, ${CREATOR.role}`} />
            <span className="hero__badge">Now booking · 2026</span>
          </div>
        </div>
      </header>

      {/* Marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span className="marquee__item" key={i}>{m}</span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className="section">
        <div className="wrap">
          <div className="features__head">
            <p className="eyebrow">What we shoot</p>
            <h2 className="display">One studio for every kind of story.</h2>
          </div>
          <div className="features__grid">
            {FEATURES.map((f, i) => (
              <article className="feature" key={f.title}>
                <span className="feature__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="section section--tight" id="work" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="features__head" style={{ marginBottom: 30 }}>
            <p className="eyebrow">Selected work</p>
            <h2 className="display">Local businesses, weddings & the moments between.</h2>
          </div>
          <div className="portfolio__filters">
            {CATS.map((c) => (
              <button key={c} className={`filter-btn ${cat === c ? 'is-active' : ''}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="portfolio-grid">
            {work.map((p) => (
              <div className="work" key={p.id}>
                <img src={p.image} alt={p.title} loading="lazy" />
                <div className="work__overlay">
                  <span className="work__cat">{p.category}</span>
                  <span className="work__title">{p.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links preview */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div>
              <p className="eyebrow">Everything in one place</p>
              <h2 className="display">Our work, reviews & booking — one link.</h2>
              <p className="lede mt-s">
                A tidy link hub that lives on our own domain: the full portfolio, the latest wedding film,
                reviews, and booking, all in one page we update ourselves in seconds.
              </p>
              <Link to="/links" className="btn mt-m">Open the hub <ArrowUpRight /></Link>
            </div>
            <div>
              {pinned.length > 0 && (
                <div className="pinned-grid" style={{ marginBottom: 14 }}>
                  {pinned.map((l) => <PinnedCard key={l.id} link={l} />)}
                </div>
              )}
              {rows.map((l) => <LinkRow key={l.id} link={l} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section section--tight center" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Now booking</p>
          <h2 className="display" style={{ maxWidth: '18ch', margin: '0 auto' }}>
            Let's capture what you're building.
          </h2>
          <div className="hero__cta-row" style={{ justifyContent: 'center', marginTop: 28 }}>
            <Link to="/book" className="btn btn--coral">Start a project <ArrowUpRight /></Link>
            <Link to="/contact" className="btn btn--ghost">Say hello</Link>
          </div>
        </div>
      </section>
    </>
  )
}
