import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CREATOR, FEATURES, MARQUEE } from '../lib/seed.js'
import { api } from '../lib/api.js'
import { PinnedCard, LinkRow } from '../components/LinkCard.jsx'
import { ArrowUpRight } from '../components/Icons.jsx'

export default function Home() {
  const [links, setLinks] = useState([])
  useEffect(() => { api.getLinks().then(setLinks) }, [])

  const pinned = links.filter((l) => l.pinned).slice(0, 2)
  const rows = links.filter((l) => !l.pinned).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <header className="hero">
        <div className="wrap hero__grid">
          <div>
            <p className="eyebrow">{CREATOR.role} · {CREATOR.location}</p>
            <h1 className="hero__name">
              {CREATOR.name.split(' ')[0]} <em>{CREATOR.name.split(' ')[1]}</em>
            </h1>
            <p className="hero__sub lede">{CREATOR.tagline} A home for my work, my bookings, and every link worth following — all in one place I actually own.</p>
            <div className="hero__cta-row">
              <Link to="/links" className="btn">Every link <ArrowUpRight /></Link>
              <Link to="/book" className="btn btn--ghost">Book a session</Link>
            </div>
          </div>
          <div className="hero__media">
            <img className="hero__photo" src={CREATOR.heroPhoto} alt={`${CREATOR.name}, ${CREATOR.role}`} />
            <span className="hero__badge">Booking · Summer 2026</span>
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

      {/* Amenities / what's included */}
      <section className="section">
        <div className="wrap">
          <div className="features__head">
            <p className="eyebrow">Why your own site</p>
            <h2 className="display">Everything a link-in-bio can't give you.</h2>
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

      {/* Links preview */}
      <section className="section section--tight" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="split">
            <div>
              <p className="eyebrow">The links page</p>
              <h2 className="display">Your link hub, reimagined.</h2>
              <p className="lede mt-s">
                Pinned covers for what matters most. Photo thumbnails so every link is recognizable.
                It lives on your domain and you update it yourself in seconds.
              </p>
              <Link to="/links" className="btn mt-m">See it live <ArrowUpRight /></Link>
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
      <section className="section">
        <div className="wrap center">
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Currently booking</p>
          <h2 className="display" style={{ maxWidth: '16ch', margin: '0 auto' }}>
            Let's make something worth keeping.
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
