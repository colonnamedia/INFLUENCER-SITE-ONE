import { useState } from 'react'
import { CREATOR } from '../lib/seed.js'
import { api } from '../lib/api.js'

const EMPTY = { name: '', email: '', projectType: 'Brand Day', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit() {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ state: 'err', msg: 'Please fill in your name, email, and a message.' })
      return
    }
    setStatus({ state: 'sending', msg: '' })
    try {
      await api.submitLead(form)
      setStatus({ state: 'ok', msg: "Got it — your inquiry is on its way. I'll be in touch within a day." })
      setForm(EMPTY)
    } catch (err) {
      setStatus({ state: 'err', msg: err.message })
    }
  }

  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h1 className="display" style={{ maxWidth: '16ch' }}>Tell me what you're dreaming up.</h1>
        </div>
      </div>

      <section className="section">
        <div className="wrap contact-grid">
          <div>
            <p className="lede">
              Booking inquiries, collaborations, or just want to say hi — this form lands straight in my inbox.
              The more you tell me about your project, the better I can help.
            </p>
            <div className="mt-m">
              <p className="eyebrow">Direct</p>
              <a href={`mailto:${CREATOR.email}`} style={{ color: 'var(--indigo)', fontWeight: 600 }}>{CREATOR.email}</a>
              <p style={{ color: 'var(--muted)', marginTop: 18 }}>{CREATOR.location} · available worldwide</p>
            </div>
          </div>

          <div className="panel">
            {status.state === 'ok' && <div className="notice notice--ok">{status.msg}</div>}
            {status.state === 'err' && <div className="notice notice--err">{status.msg}</div>}

            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" value={form.name} onChange={set('name')} placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" />
            </div>
            <div className="field">
              <label htmlFor="type">Project type</label>
              <select id="type" value={form.projectType} onChange={set('projectType')}>
                <option>The Mini</option>
                <option>Brand Day</option>
                <option>Editorial</option>
                <option>Wedding</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Tell me about it</label>
              <textarea id="message" value={form.message} onChange={set('message')} placeholder="Dates, vibe, what you need…" />
            </div>
            <button className="btn btn--coral" style={{ width: '100%', justifyContent: 'center' }} onClick={submit} disabled={status.state === 'sending'}>
              {status.state === 'sending' ? 'Sending…' : 'Send inquiry'}
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
