// Tiny API client. All admin calls send the JWT from localStorage.
// Public link fetching falls back to seed data so the site still demos
// nicely before the database/backend is wired up.

import { SEED_LINKS, GALLERY } from './seed.js'

const TOKEN_KEY = 'creator_admin_token'

export const auth = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
  isLoggedIn: () => !!localStorage.getItem(TOKEN_KEY),
}

async function request(path, { method = 'GET', body, authed = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (authed) headers.Authorization = `Bearer ${auth.get()}`
  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  if (res.status === 401) {
    auth.clear()
    throw new Error('Your session expired. Please sign in again.')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Something went wrong.')
  return data
}

export const api = {
  // ----- public -----
  async getLinks() {
    try {
      const data = await request('/links')
      return data.links && data.links.length ? data.links : SEED_LINKS
    } catch {
      return SEED_LINKS
    }
  },
  async getGallerySettings() {
    try {
      const data = await request('/gallery-settings')
      const saved = data.settings || {}
      return {
        ...GALLERY,
        ...saved,
        images: saved.images && saved.images.length ? saved.images : GALLERY.images,
      }
    } catch {
      return GALLERY
    }
  },
  submitLead(body) {
    return request('/leads', { method: 'POST', body })
  },

  // ----- admin -----
  login(password) {
    return request('/auth/login', { method: 'POST', body: { password } })
  },
  adminLinks() {
    return request('/links', { authed: true })
  },
  createLink(body) {
    return request('/links', { method: 'POST', body, authed: true })
  },
  updateLink(id, body) {
    return request(`/links/${id}`, { method: 'PUT', body, authed: true })
  },
  deleteLink(id) {
    return request(`/links/${id}`, { method: 'DELETE', authed: true })
  },
  reorderLinks(order) {
    return request('/links/reorder', { method: 'POST', body: { order }, authed: true })
  },
  saveGallerySettings(body) {
    return request('/gallery-settings', { method: 'PUT', body, authed: true })
  },
  getLeads() {
    return request('/leads', { authed: true })
  },
}
