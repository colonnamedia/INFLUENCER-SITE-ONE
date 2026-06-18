# Creator Site — Tier 2 Template (Fire-Works)

A sellable website template for **influencers, photographers, and content creators**.
The headline feature is a **links page that lives inside the site** — a "reverse Linktree" —
with a simple **owner dashboard** to manage links (pin covers, upload photos, reorder) and
read inquiries from the contact form.

Pages: **Home · About · Links · Book · Contact** + an **/admin** owner dashboard.

## Stack

- **Frontend:** Vite + React + React Router
- **Backend:** Vercel serverless functions (`/api`) — single repo, single deploy
- **Database:** Neon (Postgres)
- **Email:** Resend (contact-form notifications)
- **Auth:** password + JWT (no third-party auth service)

> Demo mode: with no database configured, the public site still renders using the
> seed content in `src/lib/seed.js`, so you can show it before wiring the backend.

---

## 1. Run locally

```bash
npm install
npm run dev          # frontend on http://localhost:5173
```

The frontend proxies `/api` to a local Vercel dev server. To run the API locally too:

```bash
npm i -g vercel
vercel dev           # serves /api on http://localhost:3000
```

Put your secrets in `.env` (copy from `.env.example`).

## 2. Database (Neon)

1. Create a project at neon.tech and copy the **pooled** connection string into `DATABASE_URL`.
2. Open the Neon SQL editor and run everything in [`db/schema.sql`](db/schema.sql).
3. (Optional) Seed the demo links: `node db/seed.mjs`

## 3. Email (Resend) — optional

1. Add and verify your domain in Resend, create an API key.
2. Set `RESEND_API_KEY`, `FROM_EMAIL` (on the verified domain), and `OWNER_EMAIL`.

The contact form works without email — inquiries are always saved to the database
and visible in the dashboard. Email just adds a notification.

## 4. Deploy (Vercel)

```bash
git init && git add . && git commit -m "Creator site"
# push to GitHub, then "Import Project" in Vercel
```

In Vercel → **Settings → Environment Variables**, add: `DATABASE_URL`, `ADMIN_PASSWORD`,
`JWT_SECRET`, and (optional) `RESEND_API_KEY`, `FROM_EMAIL`, `OWNER_EMAIL`. Redeploy.

Vercel auto-detects Vite (build `vite build`, output `dist`) and the `/api` functions.

---

## Rebranding for a client (the part you'll repeat)

Almost everything a buyer needs is in **one file**: `src/lib/seed.js`

- `CREATOR` — name, role, handle, tagline, location, email, and photo URLs
- `FEATURES` — the selling-point cards on the home page
- `PACKAGES` lives in `src/pages/Book.jsx` — pricing/packages

Swap the `picsum.photos` placeholder image URLs for the client's real photos
(host on GitHub/jsDelivr or Cloudflare R2, then paste the URLs). Update colors in
`src/index.css` (`:root` tokens — `--coral`, `--indigo`, etc.).

## Admin

- Visit `/admin`, sign in with `ADMIN_PASSWORD`.
- **Links tab:** add/edit/delete, drag-free reorder (↑/↓), pin a link to render it as a
  large cover card, upload a photo (auto-resized to ~1200px and stored in the DB).
- **Inquiries tab:** every contact-form submission, newest first.

### Image storage note
Uploaded photos are compressed client-side and stored as data URLs in Postgres — fine
for a demo and light real-world use. For heavy image use, swap the upload handler in
`src/pages/admin/Dashboard.jsx` to push to **Cloudflare R2** and store the URL instead.

## Want the Render split instead?
The `/api` folder is plain Node handlers. To match the usual Vercel-frontend /
Render-backend setup, move `/api` into a small Express app on Render (one route per
file), set `VITE` to call that backend's URL, and deploy the frontend to Vercel as a
static site. The DB and email code is unchanged.
