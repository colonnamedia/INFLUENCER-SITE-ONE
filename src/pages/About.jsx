import { Link } from 'react-router-dom'
import { CREATOR } from '../lib/seed.js'
import { ArrowUpRight } from '../components/Icons.jsx'

export default function About() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <p className="eyebrow">About</p>
          <h1 className="display" style={{ maxWidth: '14ch' }}>The person behind the lens.</h1>
        </div>
      </div>

      <section className="section">
        <div className="wrap split">
          <div className="split__media">
            <img src={CREATOR.bioPhoto} alt={CREATOR.name} />
          </div>
          <div>
            <p className="lede">
              I'm {CREATOR.name} — a {CREATOR.role.toLowerCase()} based in {CREATOR.location}.
              For the last decade I've been chasing the kind of light that makes people stop scrolling.
            </p>
            <p style={{ color: 'var(--ink-soft)', marginTop: 18 }}>
              My work sits somewhere between editorial and documentary: honest, a little cinematic, never stiff.
              I shoot brands, creators, and the occasional wedding when the story's right. Whatever the project,
              the goal is the same — images that feel like you on your best day.
            </p>
            <p style={{ color: 'var(--ink-soft)', marginTop: 18 }}>
              When I'm not behind the camera, I'm probably writing The Contact Sheet, my twice-monthly
              newsletter about the craft, or teaching workshops for creators who want to take their own
              brand seriously.
            </p>
            <Link to="/book" className="btn mt-m">Work with me <ArrowUpRight /></Link>
          </div>
        </div>
      </section>

      <section className="section section--tight" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="features__grid">
            {[
              { k: '10+ yrs', v: 'Behind the camera' },
              { k: '300+', v: 'Brands & creators shot' },
              { k: '84k', v: 'Following across platforms' },
            ].map((s) => (
              <article className="feature" key={s.v} style={{ textAlign: 'center' }}>
                <div className="display" style={{ fontSize: '2.6rem', color: 'var(--coral)' }}>{s.k}</div>
                <p style={{ marginTop: 6 }}>{s.v}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
