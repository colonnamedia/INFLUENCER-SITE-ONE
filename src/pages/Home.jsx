import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CREATOR, FEATURES, MARQUEE } from '../lib/seed.js'
import { api } from '../lib/api.js'
import { PinnedCard, LinkRow } from '../components/LinkCard.jsx'
import { ArrowUpRight } from '../components/Icons.jsx'

const CREATOR_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85', alt: 'Young adult content creator' },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85', alt: 'Adult content creator' },
  { src: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=900&q=85', alt: 'Professional creator' },
  { src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85', alt: 'Lifestyle content creator' },
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
            <span className="creator-kicker">Content Creation · Business · Events</span>
            <h1>Content that makes you <em>stand out.</em></h1>
            <p>Professional content for your business, brand, wedding, event or special occasion — created to look incredible and connect with the people you want to reach.</p>
            <div className="creator-hero__actions">
              <Link to="/gallery" className="btn creator-primary">View our work <ArrowUpRight /></Link>
              <Link to="/book" className="btn btn--ghost creator-secondary">Create with us</Link>
            </div>
          </div>

          <div className="creator-showcase creator-showcase--image" aria-label="Content creator filming professional social content">
            <img className="creator-hero-image" src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1400&q=90" alt="Content creator producing social media content" />
            <div className="creator-float creator-float--one"><span>CREATE</span><b>Business + Social</b><small>video · photo · UGC</small></div>
            <div className="creator-float creator-float--two"><b>Any story.</b><small>Any occasion.</small></div>
          </div>
        </div>
      </header>

      <div className="marquee creator-marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => <span className="marquee__item" key={i}>{m}</span>)}
        </div>
      </div>

      <section className="section creator-ages">
        <div className="wrap">
          <div className="creator-section-head">
            <span className="creator-kicker">Content has no age</span>
            <h2>Creators for every audience.</h2>
            <p>Great content can come from every generation. This template is built to showcase creators, entrepreneurs and personalities with different styles, stories and audiences.</p>
          </div>
          <div className="creator-age-grid">
            {CREATOR_IMAGES.map((image, index) => (
              <figure className={`creator-age-card creator-age-card--${index + 1}`} key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <figcaption>{['Fresh perspective', 'Lifestyle + culture', 'Business + expertise', 'Stories that connect'][index]}</figcaption>
              </figure>
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
