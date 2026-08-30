import { useEffect, useState } from 'react'
import { CREATOR } from '../lib/seed.js'
import { api } from '../lib/api.js'
import { PinnedCard, LinkRow } from '../components/LinkCard.jsx'

export default function Links() {
  const [links, setLinks] = useState(null)
  useEffect(() => { api.getLinks().then(setLinks) }, [])

  const pinned = (links || []).filter((l) => l.pinned)
  const rows = (links || []).filter((l) => !l.pinned)
  const initials = CREATOR.name.split(' ').map((n) => n[0]).join('').slice(0, 2)

  return (
    <section className="creator-linkpage">
      <div className="creator-linkpage__glow creator-linkpage__glow--one" />
      <div className="creator-linkpage__glow creator-linkpage__glow--two" />
      <div className="wrap">
        <div className="linkspage creator-linkpage__card">
          <div className="linkspage__head creator-linkpage__head">
            <div className="creator-avatar">{initials}</div>
            <span className="creator-linkpage__eyebrow">creator · lifestyle · UGC</span>
            <h1>{CREATOR.name}</h1>
            <p>{CREATOR.tagline}</p>
            <div className="creator-social-pills">
              {CREATOR.socials.map((social) => <span key={social}>{social}</span>)}
            </div>
            <p className="linkspage__handle">{CREATOR.handle}</p>
          </div>

          {links === null ? (
            <div className="spinner" />
          ) : (
            <>
              {pinned.length > 0 && <div className="pinned-grid">{pinned.map((l) => <PinnedCard key={l.id} link={l} />)}</div>}
              <div className="creator-linkpage__rows">{rows.map((l) => <LinkRow key={l.id} link={l} />)}</div>
              {links.length === 0 && <div className="empty"><b>No links yet</b>Add your first link from the owner dashboard.</div>}
            </>
          )}
          <div className="creator-linkpage__footer">© {new Date().getFullYear()} {CREATOR.name} · built on your own domain</div>
        </div>
      </div>
    </section>
  )
}
