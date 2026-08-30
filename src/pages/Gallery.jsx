import { useEffect, useState } from 'react'
import { GALLERY } from '../lib/seed.js'
import { api } from '../lib/api.js'

export default function Gallery() {
  const [gallery, setGallery] = useState(GALLERY)

  useEffect(() => {
    api.getGallerySettings().then(setGallery)
  }, [])

  const showEmbed = gallery.mode === 'embed' && gallery.embedUrl

  return (
    <>
      <section className="creator-gallery-hero">
        <div className="wrap">
          <span className="creator-kicker">Gallery</span>
          <h1>Campaigns, content & real-life moments.</h1>
          <p>A flexible gallery page for creator work, wedding content, business collaborations, travel, UGC stills and behind-the-scenes coverage.</p>
        </div>
      </section>

      <section className="section creator-gallery-section">
        <div className="wrap">
          {showEmbed ? (
            <div className="creator-gallery-embed">
              <iframe
                src={gallery.embedUrl}
                title="Creator gallery"
                loading="lazy"
                allowFullScreen
              />
            </div>
          ) : (
            <>
              <div className="creator-gallery-note">
                <strong>Creator gallery</strong>
                <span>{gallery.embedLabel}</span>
              </div>
              <div className="creator-gallery-grid">
                {gallery.images.map((image, index) => (
                  <figure className={`creator-gallery-item creator-gallery-item--${(index % 3) + 1}`} key={`${image.src}-${index}`}>
                    <img src={image.src} alt={image.alt || 'Creator gallery image'} loading="lazy" />
                  </figure>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
