import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';
import { origin, publicRoutes, publicLinksOrigin } from './src/public-pages.js';

const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const dist = path.resolve('dist');
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
if (!/<div\s+id=["']root["']\s*>\s*<\/div>/.test(template)) throw new Error('Expected an empty Vite root in the client build');
process.env.NODE_ENV = 'production';
const vite = await createServer({ mode: 'production', optimizeDeps: { noDiscovery: true, include: [], entries: [] }, server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom' });
try {
 const { render, defaultPublicContent } = await vite.ssrLoadModule('/src/entry-server.jsx');
 let content = defaultPublicContent || {};
 if (publicLinksOrigin) {
  try {
   const response = await fetch(publicLinksOrigin + '/api/links', { signal: AbortSignal.timeout(10000) });
   if (!response.ok) throw new Error('HTTP ' + response.status);
   const data = await response.json();
   if (Array.isArray(data.links) && data.links.length) content = { links: data.links };
   else console.info('Public links: using the existing demo seed because the published collection is empty.');
  } catch (error) { console.warn('Public links: retaining the existing demo fallback:', error.message); }
 }
 for (const [url, meta] of Object.entries(publicRoutes)) {
  const html = render(url, content);
  if (!/<h1(?:\s|>)/.test(html) || html.replace(/<[^>]*>/g, '').length < 150) throw new Error('Incomplete public content at ' + url);
  let page = template.replace(/<div\s+id=["']root["']\s*>\s*<\/div>/, () => `<div id="root" data-prerendered="true">${html}</div>`);
  page = page.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
   .replace(/<meta\b(?=[^>]*(?:name=["'](?:description|twitter:title|twitter:description)["']|property=["'](?:og:title|og:description|og:url)["']))[^>]*>/gi, '')
   .replace(/<link\b(?=[^>]*rel=["']canonical["'])[^>]*>/gi, '');
  const canonical = origin + (meta.canonicalPath || url);
  const tags = `<title>${escape(meta.title)}</title><meta name="description" content="${escape(meta.description)}"><link rel="canonical" href="${escape(canonical)}"><meta property="og:title" content="${escape(meta.title)}"><meta property="og:description" content="${escape(meta.description)}"><meta property="og:url" content="${escape(canonical)}"><meta name="twitter:title" content="${escape(meta.title)}"><meta name="twitter:description" content="${escape(meta.description)}">`;
  const data = JSON.stringify(content).replace(/</g, '\u003c');
  page = page.replace('</head>', tags + '</head>').replace('</body>', `<script id="public-content" type="application/json">${data}</script></body>`);
  const dir = url === '/' ? dist : path.join(dist, url.slice(1));
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'index.html'), page);
  console.info('Pre-rendered', url, html.length, 'bytes');
 }
 const appShell = template.replace(/<meta\b(?=[^>]*name=["']robots["'])[^>]*>/gi, '').replace('</head>', '<meta name="robots" content="noindex,nofollow"></head>');
 await fs.writeFile(path.join(dist, 'app.html'), appShell);
 const notFound = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found</title><meta name="robots" content="noindex,nofollow"></head><body><main><h1>Page not found</h1><p>The page you requested is unavailable.</p><a href="/">Return to the homepage</a></main></body></html>';
 await fs.writeFile(path.join(dist, '404.html'), notFound);
 const canonicalRoutes = [...new Set(Object.entries(publicRoutes).map(([url, meta]) => meta.canonicalPath || url))];
 await fs.writeFile(path.join(dist, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + canonicalRoutes.map(url => `<url><loc>${escape(origin + url)}</loc></url>`).join('') + '</urlset>');

 const review = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Responsive public-page review</title><style>body{margin:0;font:16px/1.5 system-ui;background:#e8edf0}header{padding:16px 24px}main{display:flex;align-items:start;gap:24px;padding:0 24px 24px;overflow:auto}section{flex:none}iframe{display:block;height:850px;border:5px solid #52616b;border-radius:12px;background:white}.desktop{width:1050px}.mobile{width:390px}</style></head><body><header><strong>Desktop and mobile public-page review</strong> <label>Page <select id="route">' + Object.keys(publicRoutes).map(route => '<option value="'+route+'">'+route+'</option>').join('') + '</select></label></header><main><section><p>Desktop</p><iframe class="desktop" title="Desktop public page" src="/"></iframe></section><section><p>Mobile</p><iframe class="mobile" title="Mobile public page" src="/"></iframe></section></main><script>document.getElementById("route").addEventListener("change",function(){for(const frame of document.querySelectorAll("iframe"))frame.src=this.value;});</script></body></html>';
 await fs.writeFile(path.join(dist, 'rendering-review.html'), review);
 await fs.writeFile(path.join(dist, 'rendering-manifest.json'), JSON.stringify({ strategy:'build-time React HTML with hydration', routes:Object.keys(publicRoutes), privateRoutesRendered:false }, null, 2));
} finally { await vite.close(); }
