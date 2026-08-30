import { GALLERY } from '../lib/seed.js'

export default function Gallery() {
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
          {GALLERY.embedUrl ? (
            <div className="creator-gallery-embed">
              <iframe
                src={GALLERY.embedUrl}
                title="Creator gallery"
                loading="lazy"
                allowFullScreen
              />
            </div>
          ) : (
            <>
              <div className="creator-gallery-note">
                <strong>Gallery integration ready.</strong>
                <span>{GALLERY.embedLabel}</span>
              </div>
              <div className="creator-gallery-grid">
                {GALLERY.images.map((image, index) => (
                  <figure className={`creator-gallery-item creator-gallery-item--${(index % 3) + 1}`} key={`${image.src}-${index}`}>
                    <img src={image.src} alt={image.alt} loading="lazy" />
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
