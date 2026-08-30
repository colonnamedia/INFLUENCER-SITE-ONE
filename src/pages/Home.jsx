import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CREATOR, FEATURES, MARQUEE } from '../lib/seed.js'
import { api } from '../lib/api.js'
import { PinnedCard, LinkRow } from '../components/LinkCard.jsx'
import { ArrowUpRight } from '../components/Icons.jsx'

const STATS = [
  ['Photo + Video', 'content'],
  ['Social First', 'ready to share'],
  ['Any Occasion', 'business to weddings'],
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
            <h1>Content that makes you <em>stand out.</em></h1>
            <p>{CREATOR.tagline}</p>
            <div className="creator-hero__actions">
              <Link to="/gallery" className="btn creator-primary">View our work <ArrowUpRight /></Link>
              <Link to="/book" className="btn btn--ghost creator-secondary">Start a project</Link>
            </div>
            <div className="creator-stats">
              {STATS.map(([value, label]) => (
                <div className="creator-stat" key={label}><strong>{value}</strong><span>{label}</span></div>
              ))}
            </div>
          </div>

          <div className="creator-showcase creator-showcase--photo" aria-label="Content creation preview">
            <div className="creator-photo-stack">
              <img className="creator-photo-stack__main" src={CREATOR.heroPhoto} alt="Professional content creation for businesses and special occasions" />
              <img className="creator-photo-stack__small" src={CREATOR.bioPhoto} alt="Creator filming photo and video content" />
              <div className="creator-photo-stack__label"><span>Featured</span><strong>Content creation</strong><small>business · social · events</small></div>
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
            <span className="creator-kicker">Create · capture · share</span>
            <h2>Your business. Your event. Your story.</h2>
            <p>From everyday social content and business campaigns to weddings, launches and special occasions, we create polished photo and video content built to look great everywhere you share it.</p>
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
            <span className="creator-kicker">Everything in one place.</span>
            <h2>Explore more.</h2>
            <p>Keep your latest work, social channels, booking links, media kit and featured projects together in one branded link hub.</p>
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
          <span className="creator-kicker">Let’s create something memorable</span>
          <h2>Need content for your business or a special occasion?</h2>
          <p>Tell us what you’re planning and we’ll help create content that looks polished, feels current and is ready to share.</p>
          <Link to="/book" className="btn creator-primary">Start a project <ArrowUpRight /></Link>
        </div>
      </section>
    </>
  )
}
