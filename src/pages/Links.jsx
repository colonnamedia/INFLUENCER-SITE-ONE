import { useEffect, useState } from 'react'
import { CREATOR } from '../lib/seed.js'
import { api } from '../lib/api.js'
import { PinnedCard, LinkRow } from '../components/LinkCard.jsx'

export default function Links() {
  const [links, setLinks] = useState(null)

  useEffect(() => { api.getLinks().then(setLinks) }, [])

  const pinned = (links || []).filter((l) => l.pinned)
  const rows = (links || []).filter((l) => !l.pinned)

  return (
    <section className="section">
      <div className="wrap">
        <div className="linkspage">
          <div className="linkspage__head">
            <img className="linkspage__avatar" src={CREATOR.avatar} alt={CREATOR.name} />
            <h1 className="display" style={{ fontSize: '2rem' }}>{CREATOR.name}</h1>
            <p style={{ color: 'var(--ink-soft)', margin: '4px 0 0' }}>{CREATOR.tagline}</p>
            <p className="linkspage__handle">{CREATOR.handle}</p>
          </div>

          {links === null ? (
            <div className="spinner" />
          ) : (
            <>
              {pinned.length > 0 && (
                <div className="pinned-grid">
                  {pinned.map((l) => <PinnedCard key={l.id} link={l} />)}
                </div>
              )}
              {rows.map((l) => <LinkRow key={l.id} link={l} />)}
              {links.length === 0 && (
                <div className="empty"><b>No links yet</b>Add your first link from the owner dashboard.</div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
