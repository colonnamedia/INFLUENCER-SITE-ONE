IMAGES — how to swap in your own
================================
Everything here is a placeholder. Replace any file with your own photo of the
same name and it appears automatically — no code changes needed.

Recommended sizes (keep the aspect ratio, exact pixels don't matter):
  hero.jpg .................. 900 x 1125  (tall, 4:5)  — home hero
  about.jpg ................. 900 x 900   (square)     — about page
  book.jpg .................. 900 x 900   (square)     — spare / booking
  logo.jpg .................. 320 x 320   (square)     — links-page avatar

  portfolio/*.jpg ........... 800 x 600   (4:3)        — home portfolio grid
  links/work.jpg, book.jpg .. 640 x 400   (16:10)      — pinned link covers
  links/instagram|film|reviews.jpg . 200 x 200 (square) — small link thumbs

To add a NEW portfolio piece: drop a photo in portfolio/, then add a line to
src/lib/seed.js PORTFOLIO with its path and a category of Business/Weddings/Events.

Prefer hosted images (e.g. Cloudinary)? Just paste the full URL into the same
fields in src/lib/seed.js instead of the /images/... path.
