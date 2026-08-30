import { getSql, readBody, send } from './_db.js'
import { requireAuth } from './_auth.js'

const DEFAULT_SETTINGS = {
  mode: 'grid',
  embedUrl: '',
  embedLabel: 'Paste your Pic-Time, Pixieset, SmugMug, CloudSpot, Zenfolio or other gallery embed URL here.',
  images: [],
}

async function ensureTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS creator_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`
}

export default async function handler(req, res) {
  const sql = getSql()

  try {
    await ensureTable(sql)
  } catch (e) {
    return send(res, 500, { error: e.message })
  }

  if (req.method === 'GET') {
    try {
      const rows = await sql`SELECT value FROM creator_settings WHERE key = 'gallery' LIMIT 1`
      if (!rows.length) return send(res, 200, { settings: DEFAULT_SETTINGS })
      let settings = DEFAULT_SETTINGS
      try { settings = { ...DEFAULT_SETTINGS, ...JSON.parse(rows[0].value) } } catch {}
      return send(res, 200, { settings })
    } catch (e) {
      return send(res, 500, { error: e.message })
    }
  }

  if (req.method === 'PUT') {
    try {
      requireAuth(req)
    } catch {
      return send(res, 401, { error: 'unauthorized' })
    }

    try {
      const body = readBody(req)
      const settings = {
        mode: body.mode === 'embed' ? 'embed' : 'grid',
        embedUrl: typeof body.embedUrl === 'string' ? body.embedUrl.trim() : '',
        embedLabel: typeof body.embedLabel === 'string' ? body.embedLabel.trim() : DEFAULT_SETTINGS.embedLabel,
        images: Array.isArray(body.images)
          ? body.images
              .filter((img) => img && typeof img.src === 'string' && img.src.trim())
              .slice(0, 24)
              .map((img) => ({ src: img.src.trim(), alt: typeof img.alt === 'string' ? img.alt.trim() : '' }))
          : [],
      }

      await sql`
        INSERT INTO creator_settings (key, value, updated_at)
        VALUES ('gallery', ${JSON.stringify(settings)}, NOW())
        ON CONFLICT (key)
        DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`

      return send(res, 200, { settings })
    } catch (e) {
      return send(res, 500, { error: e.message })
    }
  }

  return send(res, 405, { error: 'Method not allowed' })
}
