import { Link } from 'react-router-dom'
import { CREATOR } from '../lib/seed.js'
import { ArrowUpRight } from '../components/Icons.jsx'

export default function About() {
  return (
    <>
      <div className="pagehead creator-pagehead">
        <div className="wrap">
          <span className="creator-kicker">About {CREATOR.name}</span>
          <h1 className="display" style={{ maxWidth: '14ch' }}>The person behind the posts.</h1>
        </div>
      </div>

      <section className="section">
        <div className="wrap creator-about-grid">
          <div className="creator-about-art">
            <span>CREATE</span><span>CONNECT</span><span>SHARE</span>
            <strong>{CREATOR.handle}</strong>
          </div>
          <div>
            <p className="lede">I’m {CREATOR.name} — a lifestyle creator building a community around useful finds, honest recommendations, everyday routines and experiences worth sharing.</p>
            <p style={{ color: 'var(--ink-soft)', marginTop: 18 }}>My content lives at the intersection of personality and intention. I want a post to feel natural enough for the audience to trust it, while still giving a brand the clarity, quality and story it needs to perform.</p>
            <p style={{ color: 'var(--ink-soft)', marginTop: 18 }}>I partner with brands that fit the world I’m already creating — lifestyle, wellness, style, travel, food, home and products that make everyday life better.</p>
            <Link to="/book" className="btn creator-primary mt-m">Work with me <ArrowUpRight /></Link>
          </div>
        </div>
      </section>

      <section className="section section--tight creator-proof">
        <div className="wrap creator-proof-grid">
          {[['125K+', 'Community'], ['4.8M', 'Monthly views'], ['7.2%', 'Average engagement']].map(([k, v]) => (
            <article key={v}><strong>{k}</strong><span>{v}</span></article>
          ))}
        </div>
      </section>
    </>
  )
}
