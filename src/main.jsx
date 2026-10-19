import RouteMetadata from './RouteMetadata.jsx';
import { PublicContentContext, readPublicContent } from './PublicContent.jsx';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import './creator.css'
import './creator-pages.css'

(document.getElementById('root').hasChildNodes() ? { render: (node) => ReactDOM.hydrateRoot(document.getElementById('root'), node) } : ReactDOM.createRoot(document.getElementById('root'))).render(
  <React.StrictMode>
    <BrowserRouter>
      <PublicContentContext.Provider value={readPublicContent()}><App /><RouteMetadata /></PublicContentContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
