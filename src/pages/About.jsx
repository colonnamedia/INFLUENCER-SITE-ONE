import { Link } from 'react-router-dom'
import { CREATOR } from '../lib/seed.js'
import { ArrowUpRight } from '../components/Icons.jsx'

export default function About() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <p className="eyebrow">About</p>
          <h1 className="display" style={{ maxWidth: '16ch' }}>A local studio for local stories.</h1>
        </div>
      </div>

      <section className="section">
        <div className="wrap split">
          <div className="split__media">
            <img src={CREATOR.bioPhoto} alt={CREATOR.name} />
          </div>
          <div>
            <p className="lede">
              We're {CREATOR.name} — a content and media studio based in {CREATOR.location}, shooting for the
              small businesses, couples, and community events that give this place its character.
            </p>
            <p style={{ color: 'var(--ink-soft)', marginTop: 18 }}>
              Our work sits somewhere between editorial and documentary: honest, a little cinematic, never stiff.
              One week it's a bakery's brand refresh, the next it's a riverside wedding or a packed night market.
              Whatever the project, the goal is the same — images and video that feel like the real thing on its best day.
            </p>
            <p style={{ color: 'var(--ink-soft)', marginTop: 18 }}>
              Because we're local, you get a real person on the phone, a fast turnaround, and someone who
              actually knows the venues, the light, and the neighborhoods your story lives in.
            </p>
            <Link to="/book" className="btn mt-m">Work with us <ArrowUpRight /></Link>
          </div>
        </div>
      </section>

      <section className="section section--tight" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="features__grid">
            {[
              { k: '10+ yrs', v: 'Behind the camera' },
              { k: '300+', v: 'Local shoots delivered' },
              { k: '5.0★', v: 'Across local reviews' },
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
