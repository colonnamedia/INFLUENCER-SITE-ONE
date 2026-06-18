import { Link } from 'react-router-dom'
import { CREATOR } from '../lib/seed.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <div className="footer__brand">{CREATOR.name}</div>
          <p style={{ color: 'rgba(250,247,242,0.7)', maxWidth: '34ch', marginTop: 12 }}>
            {CREATOR.tagline} Based in {CREATOR.location}.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/about">About</Link>
          <Link to="/links">Links</Link>
          <Link to="/book">Book a session</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Elsewhere</h4>
          {CREATOR.socials.map((s) => (
            <a key={s} href="#" rel="noreferrer">{s}</a>
          ))}
        </div>
      </div>
      <div className="wrap footer__bottom">
        <span>© {year} {CREATOR.name}. All rights reserved.</span>
        <span>
          Site by <a href="https://fireworks.colonnamedia.com" rel="noreferrer">Fire-Works</a> · <Link to="/admin">Owner login</Link>
        </span>
      </div>
    </footer>
  )
}
