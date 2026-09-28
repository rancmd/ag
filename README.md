# ART GEM

> A free, ad-free creative world where people can discover and watch artists create, learn from their process, and support them — without the noise of mainstream social media.

## Live Demo

Enable GitHub Pages from the `main` branch root. Add to iOS home screen via Safari → Share → "Add to Home Screen".

## Features

- **Video Feed** — Vertical scroll-snap feed of real artist process videos. Local MP4 for smooth in-app playback.
- **Artist Profiles** — Full profile with Videos, Gallery, Materials, Learn, Shop, and Support tabs.
- **Search / Discover** — Instant search across artists, videos, styles, and materials. Category chips for quick filtering.
- **Following** — Follow artists you love. Recent work from followed artists in one place.
- **PWA** — Installable to iOS/Android home screen. Offline shell via Service Worker.

## Artist Roster (MVP)

| Artist | Craft |
|---|---|
| Chommang | Figure Drawing & Illustration |
| Drewscape | Watercolor & Urban Sketching |
| Mmmmonexx | Sketch & Illustration |
| Nisu | Portrait & Figure Drawing |
| Akihito Yoshitomi | Manga & Character Design |
| Sofia Carbone | Charcoal & Life Drawing |

## File Structure

```
artgem/
├── index.html          ← App shell + PWA meta tags
├── manifest.json       ← PWA manifest
├── sw.js               ← Service worker (offline shell)
├── css/
│   ├── base.css        ← Design system, tokens, typography
│   ├── layout.css      ← App shell, nav, headers
│   ├── feed.css        ← Video feed
│   ├── profile.css     ← Artist profile
│   ├── search.css      ← Search / Discover
│   └── following.css   ← Following page
├── js/
│   ├── data.js         ← All mock data + helpers (replace with API)
│   ├── state.js        ← Follow/like state (localStorage)
│   ├── router.js       ← Hash-based SPA router
│   ├── feed.js         ← Feed page
│   ├── profile.js      ← Artist profile page
│   ├── search.js       ← Search / Discover page
│   ├── following.js    ← Following page
│   └── app.js          ← Bootstrap, routing, logo SVG
└── assets/
    ├── icons/          ← PWA icons (SVG)
    └── videos/         ← Local artist process videos (MP4)
```

## iOS Home Screen Setup

1. Open the GitHub Pages URL in **Safari**
2. Tap the **Share** button (bottom center)
3. Tap **"Add to Home Screen"**
4. Tap **Add** — ART GEM installs as a standalone app

## Replacing Mock Data

All artist and video data lives in `js/data.js`. The `ARTISTS` object and `FEED_VIDEO_IDS` array are the only things that need replacing when connecting a real backend. All page renderers call `getFeedVideos()`, `getArtist()`, `searchContent()` etc., so swapping the data layer is straightforward.

## Brand

- **Purple**: `#A083D5` (primary), `#7B5EA7` (dark), `#B19CD8` (light)
- **Yellow**: `#EFCF20` (accent), `#F4E064` (soft)
- **Font**: DM Sans (body) + Playfair Display (headings)
