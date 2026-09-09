import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CREATOR, FEATURES, MARQUEE } from '../lib/seed.js'
import { api } from '../lib/api.js'
import { PinnedCard, LinkRow } from '../components/LinkCard.jsx'
import { ArrowUpRight } from '../components/Icons.jsx'

const BRAND_COLLABORATIONS = [
  { name: 'NIKE', className: 'creator-brand-mark--nike' },
  { name: 'lululemon', className: 'creator-brand-mark--lululemon' },
  { name: 'GYMSHARK', className: 'creator-brand-mark--gymshark' },
  { name: 'alo', className: 'creator-brand-mark--alo' },
  { name: 'Hydro Flask', className: 'creator-brand-mark--hydro' },
  { name: 'STANLEY', className: 'creator-brand-mark--stanley' },
  { name: 'ŌURA', className: 'creator-brand-mark--oura' },
  { name: 'CLEAN SIMPLE EATS', className: 'creator-brand-mark--cse' },
  { name: '1st PHORM', className: 'creator-brand-mark--phorm' },
]

const CREATOR_STATS = [
  { value: '250K+', label: 'Social reach' },
  { value: '500+', label: 'Pieces of content' },
  { value: '100+', label: 'Brands & businesses' },
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
            <span className="creator-kicker">Fitness · Wellness · Lifestyle</span>
            <h1>Content that makes you <em>stand out.</em></h1>
            <p>High-energy fitness and lifestyle content made to stop the scroll, build real trust and help the right brands connect with the right audience.</p>
            <div className="creator-hero__actions">
              <a href="#collaborations" className="btn creator-primary">View collaborations <ArrowUpRight /></a>
              <Link to="/book" className="btn btn--ghost creator-secondary">Work with me</Link>
            </div>
            <div className="creator-stats" aria-label="Creator highlights">
              {CREATOR_STATS.map((stat) => (
                <div className="creator-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="creator-showcase creator-showcase--image" aria-label="Content creator filming professional social content">
            <img
              className="creator-hero-image"
              src="/images/fitness-creator-hero.webp"
              alt="Fit female creator filming workout content in a modern gym"
              width="1100"
              height="1375"
              fetchPriority="high"
            />
            <div className="creator-float creator-float--one"><span>CREATE</span><b>Fitness + Wellness</b><small>video · photo · UGC</small></div>
            <div className="creator-float creator-float--two"><b>Good content.</b><small>Stronger brands.</small></div>
          </div>
        </div>
      </header>

      <div className="marquee creator-marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => <span className="marquee__item" key={i}>{m}</span>)}
        </div>
      </div>

      <section className="section creator-brands" id="collaborations">
        <div className="wrap creator-brands__layout">
          <div className="creator-brands__intro">
            <span className="creator-kicker">Brands I’ve worked with</span>
            <h2>Trusted by brands that move people.</h2>
            <p>Authentic fitness, wellness and lifestyle content built for launches, partnerships, organic social and paid campaigns.</p>
            <Link to="/book" className="btn creator-brands__cta">Let’s create together <ArrowUpRight /></Link>
          </div>
          <div className="creator-brand-grid" role="list" aria-label="Selected brand collaborations">
            {BRAND_COLLABORATIONS.map((brand) => (
              <div className={`creator-brand-mark ${brand.className}`} role="listitem" key={brand.name}>
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section creator-services">
        <div className="wrap">
          <div className="creator-section-head">
            <span className="creator-kicker">Create · connect · stand out</span>
            <h2>Your business. Your event. Your story.</h2>
            <p>From social media content and brand campaigns to weddings, events and one-of-a-kind occasions, we create polished content designed around what you want people to see, feel and remember.</p>
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
            <p>A branded link hub for social channels, products, affiliate links, galleries, media kits, launches and everything you want your audience to find.</p>
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
          <span className="creator-kicker">Let’s create something unforgettable</span>
          <h2>Need content for your business or a special occasion?</h2>
          <p>Tell us what you’re planning and what you want the content to accomplish. We’ll build the creative around you.</p>
          <Link to="/book" className="btn creator-primary">Start your project <ArrowUpRight /></Link>
        </div>
      </section>
    </>
  )
}
