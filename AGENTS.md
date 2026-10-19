# FireWorks website build rules

## Homepage photography

Every new or updated industry website homepage must contain **four to five distinct, relevant photographs**. If an existing homepage has only one or two photographs, bring it up to four or five during the image audit. A logo, icon, screenshot, repeated hero image or alternate crop of the same photo does not count as another photo.

Place supporting photos purposefully within the page while preserving its industry, style and primary call to action. Preserve sites that already have sufficient relevant imagery. Use licensed stock, approved client photos or original generated assets; do not reuse another client's photos. Stock and generated photos must not be presented as actual employees, client results, completed projects or testimonials.

Store the final optimized assets in each site's repository. Prefer WebP, include alt text and dimensions, lazy-load below-the-fold photos, and check mobile cropping and desktop layout. Ensure source generators retain the photos after rebuilds. Record image sources and verify the deployed homepage has at least four distinct relevant photos before calling this audit complete.

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
