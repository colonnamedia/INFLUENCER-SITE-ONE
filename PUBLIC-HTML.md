# Public page delivery

Build: `npm run build`. This runs the existing Vite client build, React build-time HTML generation, and `scripts/check-public-html.mjs`.

Routes: `/`, `/about`, `/links`, `/book`, `/contact`.

Metadata source: `src/public-pages.js`. Browser hydration uses the same page components as pre-rendering. The public link hub, where present, snapshots only the unauthenticated public feed, falls back to the existing demo seed if unavailable, embeds that snapshot for matching hydration, and refreshes through its existing public API after startup. Owner routes retain a noindex client shell; APIs and form destinations are preserved.

The generated `/rendering-review.html` page provides desktop and mobile review frames. It is noindex and not in the sitemap. Unknown URLs use a static 404 document.


## Public HTML and pre-launch verification

For each new template and every existing template before client launch:

- Inspect the actual response HTML at every public route. Preserve existing static generation, pre-rendering or server-side rendering when it already delivers the important content.
- If important public content appears only after JavaScript runs, add build-time pre-rendering where practical. Keep one source of page content for server/build output and interactive rendering. Hydrate the generated HTML without changing the initial page tree. Do not add a redundant rendering layer to an already-static site.
- Each public route must return the intended page with one accurate title, one description, a canonical URL and consistent social metadata in the response HTML. Treat aliases explicitly. Public pages must not silently return a homepage shell. Preserve existing noindex choices on demos and private pages.
- Render only published public data. Never pre-render dashboards, login sessions, customer records, tokens or private account data. Keep admin/API routes separate. Fetch public content during a build when appropriate, with a documented existing demo fallback, then allow the client to refresh it.
- Fail builds when an expected route is missing, public HTML is empty, metadata is duplicated or the rendering stage fails. Generate the public sitemap from the same route list. Confirm the host serves generated files at clean URLs rather than rewriting everything to the homepage.
- Verify direct requests to all declared public URLs, refreshes on nested routes, internal navigation, 404s, mobile menus and representative desktop/mobile layouts. Confirm important text is visible before JavaScript and check for hydration errors afterward.
- Check forms and their validation without sending real messages, orders or bookings. Use local-only demo confirmations for template forms; configure and test a real client's approved delivery destination separately before launch. Do not treat pre-rendering as proof that form delivery works.
- Record rendering strategy, public routes, build command, metadata source, verification results and outstanding client-launch requirements in the project handoff. Re-run the checks after client content, domain, route or integration changes.
