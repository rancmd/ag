// ============================================================
// ART GEM — App Bootstrap (app.js)
// Wires together routing, navigation, and page rendering.
// ============================================================

// ── Logo SVG (shared by all pages) ──────────────────────────
function logoSVG(size = 32, sparkColor = '#EFCF20') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="gemGrad" x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stop-color="#C4A8E8"/>
        <stop offset="100%" stop-color="#7B5EA7"/>
      </linearGradient>
      <linearGradient id="gemTop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.3)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0.05)"/>
      </linearGradient>
    </defs>
    <!-- Diamond body -->
    <path d="M18 3 L33 14 L18 33 L3 14 Z" fill="url(#gemGrad)"/>
    <!-- Top facet highlight -->
    <path d="M3 14 L18 3 L33 14 L18 14 Z" fill="url(#gemTop)"/>
    <!-- Center dividing line -->
    <line x1="3" y1="14" x2="33" y2="14" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
    <!-- Sparkle star -->
    <path d="M29 3 L30.4 7 L34 8.2 L30.4 9.4 L29 13.4 L27.6 9.4 L24 8.2 L27.6 7 Z" fill="${sparkColor}"/>
  </svg>`;
}

// ── Page management ───────────────────────────────────────────
const PAGES = ['feed', 'search', 'following', 'profile'];

function showPage(pageId) {
  PAGES.forEach(id => {
    const el = document.getElementById(`page-${id}`);
    if (el) el.classList.toggle('active', id === pageId);
  });
  // Update top nav active state, theme, and visibility
  const topNav = document.getElementById('top-nav');
  if (topNav) {
    topNav.style.display = pageId === 'profile' ? 'none' : 'flex';
    topNav.classList.toggle('nav-on-light', pageId !== 'feed');
  }
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });
}

// ── Route handlers ────────────────────────────────────────────
router
  .on('feed', () => {
    showPage('feed');
    renderFeed();
  })
  .on('search', () => {
    showPage('search');
    renderSearch();
  })
  .on('following', () => {
    showPage('following');
    renderFollowing();
  })
  .on('artist/:id', ({ id }) => {
    showPage('profile');
    renderProfile(id);
  });

// Cleanup hooks on navigation away from pages
router.beforeEach((path) => {
  if (!path.startsWith('feed'))    cleanupFeed();
  if (!path.startsWith('artist'))  cleanupProfile();
});

// ── Bottom nav wiring ─────────────────────────────────────────
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    router.navigate(btn.dataset.page);
  });
});

// ── Start the router ─────────────────────────────────────────
router.start();

// ── Excel Database Live Integration ──────────────────────────
// When artgem_database.xlsx is loaded, refresh current view seamlessly
document.addEventListener('artgem:dataloaded', () => {
  const raw = window.location.hash.slice(1) || 'feed';
  const path = raw.replace(/^\//, '');
  if (path === 'feed' || path === '') {
    renderFeed();
  } else if (path === 'search') {
    renderSearch();
  } else if (path === 'following') {
    renderFollowing();
  } else if (path.startsWith('artist/')) {
    const id = path.split('/')[1];
    renderProfile(id);
  }
});

// Automatically sync live with Google Sheets, falling back to local Excel/built-in data
if (typeof initDatabase === 'function') {
  initDatabase();
}
