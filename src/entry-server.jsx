import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import App from './App.jsx';
import { PublicContentContext, defaultPublicContent } from './PublicContent.jsx';
export { defaultPublicContent };
export const render = (url, content = defaultPublicContent) => renderToString(<StaticRouter location={url}><PublicContentContext.Provider value={content}><App /></PublicContentContext.Provider></StaticRouter>);
