import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, auth } from '../../lib/api.js'
import { Edit, Trash, Up, Down, Plus } from '../../components/Icons.jsx'

/* Resize/compress an uploaded image to a data URL so DB rows stay small. */
function fileToDataUrl(file, maxW = 1200, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width)
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w; canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.onerror = reject
      img.src = reader.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const BLANK = { title: '', subtitle: '', url: '', image: '', pinned: false }

function LinkEditor({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial || BLANK)
  const [uploading, setUploading] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function onFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const dataUrl = await fileToDataUrl(file)
      setForm((f) => ({ ...f, image: dataUrl }))
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{initial?.id ? 'Edit link' : 'Add link'}</h3>
        {form.image && <img className="upload-preview" src={form.image} alt="" />}
        <div className="field">
          <label>Photo {form.pinned ? '(cover)' : '(thumbnail)'}</label>
          <input type="file" accept="image/*" onChange={onFile} />
          {uploading && <small style={{ color: 'var(--muted)' }}>Processing image…</small>}
          {form.image && <button className="btn btn--ghost btn--sm mt-s" onClick={() => setForm((f) => ({ ...f, image: '' }))}>Remove photo</button>}
        </div>
        <div className="field"><label>Title</label><input value={form.title} onChange={set('title')} placeholder="e.g. Spring Editorial" /></div>
        <div className="field"><label>Subtitle <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span></label><input value={form.subtitle} onChange={set('subtitle')} placeholder="e.g. My favorite shoot this year" /></div>
        <div className="field"><label>URL</label><input value={form.url} onChange={set('url')} placeholder="https://…" /></div>
        <div className="checkbox-row">
          <input id="pinned" type="checkbox" checked={form.pinned} onChange={(e) => setForm((f) => ({ ...f, pinned: e.target.checked }))} />
          <label htmlFor="pinned">Pin as a featured cover card (shows the photo large)</label>
        </div>
        <div className="modal__actions">
          <button className="btn btn--ghost btn--sm" onClick={onClose}>Cancel</button>
          <button className="btn btn--coral btn--sm" onClick={() => { if (!form.title.trim() || !form.url.trim()) return; onSave(form) }}>Save link</button>
        </div>
      </div>
    </div>
  )
}

function LinksTab() {
  const [links, setLinks] = useState(null)
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try { const { links } = await api.adminLinks(); setLinks(links) }
    catch (e) { setError(e.message) }
  }, [])

  useEffect(() => { load() }, [load])

  async function save(form) {
    try {
      if (form.id) await api.updateLink(form.id, form)
      else await api.createLink(form)
      setEditing(null); load()
    } catch (e) { setError(e.message) }
  }

  async function remove(id) {
    if (!confirm('Delete this link?')) return
    await api.deleteLink(id); load()
  }

  async function move(index, dir) {
    const next = [...links]
    const swap = index + dir
    if (swap < 0 || swap >= next.length) return
    ;[next[index], next[swap]] = [next[swap], next[index]]
    setLinks(next)
    await api.reorderLinks(next.map((l) => l.id))
  }

  if (links === null) return <div className="spinner" />

  return (
    <>
      {error && <div className="notice notice--err">{error}</div>}
      <div className="panel">
        <div className="panel__head"><h2>Your links</h2><button className="btn btn--coral btn--sm" onClick={() => setEditing(BLANK)}><Plus /> Add link</button></div>
        {links.length === 0 ? <div className="empty"><b>No links yet</b>Add your first one to fill your links page.</div> : links.map((l, i) => (
          <div className="admin-link" key={l.id}>
            {l.image ? <img className="admin-link__thumb" src={l.image} alt="" /> : <div className="admin-link__thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--coral)', fontWeight: 700 }}>{(l.title || '?')[0]}</div>}
            <div className="admin-link__info"><b>{l.title}</b><small>{l.url}</small>{l.pinned && <span className="admin-link__pin">★ Featured cover</span>}</div>
            <div className="admin-link__actions">
              <button className="icon-btn" onClick={() => move(i, -1)} aria-label="Move up"><Up /></button>
              <button className="icon-btn" onClick={() => move(i, 1)} aria-label="Move down"><Down /></button>
              <button className="icon-btn" onClick={() => setEditing(l)} aria-label="Edit"><Edit /></button>
              <button className="icon-btn icon-btn--danger" onClick={() => remove(l.id)} aria-label="Delete"><Trash /></button>
            </div>
          </div>
        ))}
      </div>
      {editing && <LinkEditor initial={editing} onClose={() => setEditing(null)} onSave={save} />}
    </>
  )
}

function GalleryTab() {
  const [settings, setSettings] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    api.getGallerySettings().then(setSettings).catch((e) => setError(e.message))
  }, [])

  if (!settings && !error) return <div className="spinner" />
  if (!settings) return <div className="notice notice--err">{error}</div>

  const set = (key) => (e) => setSettings((s) => ({ ...s, [key]: e.target.value }))

  function updateImage(index, key, value) {
    setSettings((s) => ({ ...s, images: s.images.map((img, i) => i === index ? { ...img, [key]: value } : img) }))
  }

  function removeImage(index) {
    setSettings((s) => ({ ...s, images: s.images.filter((_, i) => i !== index) }))
  }

  function moveImage(index, dir) {
    const swap = index + dir
    if (swap < 0 || swap >= settings.images.length) return
    const images = [...settings.images]
    ;[images[index], images[swap]] = [images[swap], images[index]]
    setSettings((s) => ({ ...s, images }))
  }

  async function uploadImage(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const src = await fileToDataUrl(file, 1600, 0.84)
      setSettings((s) => ({ ...s, images: [...s.images, { src, alt: '' }].slice(0, 24) }))
    } catch (e) { setError(e.message) }
    finally { setUploading(false); e.target.value = '' }
  }

  async function save() {
    setNotice(''); setError('')
    try {
      const { settings: saved } = await api.saveGallerySettings(settings)
      setSettings((s) => ({ ...s, ...saved, images: saved.images.length ? saved.images : s.images }))
      setNotice('Gallery settings saved. Your public Gallery page is updated.')
    } catch (e) { setError(e.message) }
  }

  return (
    <>
      {error && <div className="notice notice--err">{error}</div>}
      {notice && <div className="notice">{notice}</div>}
      <div className="panel">
        <div className="panel__head">
          <div><h2>Gallery</h2><small style={{ color: 'var(--muted)' }}>Choose an embedded imaging gallery or manage the built-in image grid.</small></div>
          <a className="btn btn--ghost btn--sm" href="/gallery" target="_blank" rel="noreferrer">View gallery</a>
        </div>

        <div className="field">
          <label>Gallery mode</label>
          <select value={settings.mode || 'grid'} onChange={set('mode')}>
            <option value="grid">Built-in image gallery</option>
            <option value="embed">External gallery embed</option>
          </select>
        </div>

        {settings.mode === 'embed' ? (
          <>
            <div className="field">
              <label>Gallery embed URL</label>
              <input value={settings.embedUrl || ''} onChange={set('embedUrl')} placeholder="https://your-gallery-provider.com/..." />
              <small style={{ color: 'var(--muted)' }}>Use the public iframe/embed URL supplied by Pic-Time, Pixieset, SmugMug, CloudSpot, Zenfolio or another provider. The provider must allow iframe embedding.</small>
            </div>
            <div className="field">
              <label>Fallback message</label>
              <input value={settings.embedLabel || ''} onChange={set('embedLabel')} />
            </div>
          </>
        ) : (
          <>
            <div className="field">
              <label>Add gallery image</label>
              <input type="file" accept="image/*" onChange={uploadImage} disabled={uploading || settings.images.length >= 24} />
              {uploading && <small style={{ color: 'var(--muted)' }}>Processing image…</small>}
              <small style={{ color: 'var(--muted)' }}>Upload up to 24 images. Images are resized before saving.</small>
            </div>

            {settings.images.map((img, i) => (
              <div className="admin-link" key={`${i}-${img.src.slice(0, 24)}`} style={{ alignItems: 'center' }}>
                <img className="admin-link__thumb" src={img.src} alt="" />
                <div className="admin-link__info" style={{ gap: 6 }}>
                  <input value={img.alt || ''} onChange={(e) => updateImage(i, 'alt', e.target.value)} placeholder="Image description / alt text" />
                  {!img.src.startsWith('data:') && <input value={img.src} onChange={(e) => updateImage(i, 'src', e.target.value)} placeholder="Image URL" />}
                </div>
                <div className="admin-link__actions">
                  <button className="icon-btn" onClick={() => moveImage(i, -1)} aria-label="Move up"><Up /></button>
                  <button className="icon-btn" onClick={() => moveImage(i, 1)} aria-label="Move down"><Down /></button>
                  <button className="icon-btn icon-btn--danger" onClick={() => removeImage(i)} aria-label="Remove image"><Trash /></button>
                </div>
              </div>
            ))}

            <button className="btn btn--ghost btn--sm mt-s" onClick={() => setSettings((s) => ({ ...s, images: [...s.images, { src: '', alt: '' }] }))} disabled={settings.images.length >= 24}><Plus /> Add image URL</button>
          </>
        )}

        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn--coral" onClick={save}>Save gallery</button>
        </div>
      </div>
    </>
  )
}

function LeadsTab() {
  const [leads, setLeads] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => { api.getLeads().then((d) => setLeads(d.leads)).catch((e) => setError(e.message)) }, [])
  if (leads === null && !error) return <div className="spinner" />

  return (
    <div className="panel">
      <div className="panel__head"><h2>Inquiries</h2></div>
      {error && <div className="notice notice--err">{error}</div>}
      {leads && leads.length === 0 && <div className="empty"><b>No inquiries yet</b>Messages from your contact form will appear here.</div>}
      {leads && leads.map((l) => (
        <div className="lead-row" key={l.id}>
          <div className="lead-row__top"><span className="lead-row__name">{l.name} · <span style={{ color: 'var(--muted)', fontWeight: 400 }}>{l.project_type}</span></span><span className="lead-row__date">{new Date(l.created_at).toLocaleDateString()}</span></div>
          <a className="lead-row__email" href={`mailto:${l.email}`}>{l.email}</a>
          <p className="lead-row__msg">{l.message}</p>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [tab, setTab] = useState('links')
  const nav = useNavigate()
  function logout() { auth.clear(); nav('/admin', { replace: true }) }

  return (
    <div className="admin">
      <div className="admin__bar">
        <div className="wrap admin__bar-inner">
          <div className="admin__bar-brand">Influencer <span>Creator dashboard</span></div>
          <div style={{ display: 'flex', gap: 10 }}>
            <a className="btn btn--ghost btn--sm" style={{ color: 'var(--paper)', borderColor: 'rgba(255,255,255,0.3)' }} href="/" target="_blank" rel="noreferrer">View site</a>
            <button className="btn btn--sm" onClick={logout}>Sign out</button>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="admin__tabs">
          <button className={`admin__tab ${tab === 'links' ? 'is-active' : ''}`} onClick={() => setTab('links')}>Links</button>
          <button className={`admin__tab ${tab === 'gallery' ? 'is-active' : ''}`} onClick={() => setTab('gallery')}>Gallery</button>
          <button className={`admin__tab ${tab === 'leads' ? 'is-active' : ''}`} onClick={() => setTab('leads')}>Inquiries</button>
        </div>
        {tab === 'links' && <LinksTab />}
        {tab === 'gallery' && <GalleryTab />}
        {tab === 'leads' && <LeadsTab />}
      </div>
    </div>
  )
}
