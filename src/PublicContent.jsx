import { createContext, useContext } from 'react';
import { SEED_LINKS } from './lib/seed.js';
export const defaultPublicContent = { links: SEED_LINKS };
export const PublicContentContext = createContext(defaultPublicContent);
export const usePublicContent = () => useContext(PublicContentContext);
export function readPublicContent() {
 try { const data = JSON.parse(document.getElementById('public-content')?.textContent || 'null'); return Array.isArray(data?.links) ? data : defaultPublicContent; } catch { return defaultPublicContent; }
}
