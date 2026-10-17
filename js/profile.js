// ============================================================
// ART GEM — Artist Profile Page (profile.js)
// ============================================================

let currentProfileArtistId = null;

function renderProfile(artistId) {
  currentProfileArtistId = artistId;
  const artist = getArtist(artistId);
  const page = document.getElementById('page-profile');
  page.innerHTML = '';

  if (!artist) {
    page.innerHTML = `<div class="page-header"><button class="btn-back" onclick="router.back()">${iconBack()}</button><span class="page-header-title">Artist not found</span></div>`;
    return;
  }

  // ── Header bar ───────────────────────────────────────────
  const header = document.createElement('div');
  header.className = 'page-header';
  header.innerHTML = `
    <button class="btn-back" id="profile-back-btn" aria-label="Go back">${iconBack()}</button>
    <span class="page-header-title">${artist.name}</span>
    <div style="width:38px"></div>`;
  page.appendChild(header);

  header.querySelector('#profile-back-btn').addEventListener('click', () => router.back());

  // ── Scrollable area ──────────────────────────────────────
  const scroll = document.createElement('div');
  scroll.className = 'profile-scroll';
  page.appendChild(scroll);

  // ── Hero section ─────────────────────────────────────────
  scroll.appendChild(buildProfileHero(artist));

  // ── Tabs ─────────────────────────────────────────────────
  const tabsDef = [
    { id: 'videos',    label: 'Videos'    },
    { id: 'gallery',   label: 'Gallery'   },
    { id: 'materials', label: 'Materials' },
    { id: 'learn',     label: 'Learn'     },
    { id: 'shop',      label: 'Shop'      },
    { id: 'support',   label: 'Support'   },
  ];

  const tabsBar = document.createElement('div');
  tabsBar.className = 'profile-tabs';
  tabsDef.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'profile-tab';
    btn.dataset.tab = t.id;
    btn.textContent = t.label;
    btn.addEventListener('click', () => switchProfileTab(t.id, scroll));
    tabsBar.appendChild(btn);
  });
  scroll.appendChild(tabsBar);

  // ── Tab content panels ────────────────────────────────────
  const panels = document.createElement('div');
  panels.id = 'profile-panels';
  panels.appendChild(buildVideosTab(artist));
  panels.appendChild(buildGalleryTab(artist));
  panels.appendChild(buildMaterialsTab(artist));
  panels.appendChild(buildLearnTab(artist));
  panels.appendChild(buildShopTab(artist));
  panels.appendChild(buildSupportTab(artist));
  scroll.appendChild(panels);

  // Activate first tab
  switchProfileTab('videos', scroll, tabsBar);

  // Listen for state changes
  document.addEventListener('artgem:statechange', onProfileStateChange);
}

function cleanupProfile() {
  document.removeEventListener('artgem:statechange', onProfileStateChange);
  currentProfileArtistId = null;
}

function onProfileStateChange(e) {
  if (e.detail.type === 'follow' && e.detail.artistId === currentProfileArtistId) {
    const btn = document.getElementById('profile-follow-btn');
    if (btn) updateProfileFollowBtn(btn, e.detail.following);
  }
}

// ── Switch tab ───────────────────────────────────────────────
function switchProfileTab(tabId, scroll, tabsBar) {
  const bar = tabsBar || scroll.querySelector('.profile-tabs');
  bar.querySelectorAll('.profile-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.profile-tab-content').forEach(panel => {
    panel.classList.toggle('active', panel.dataset.tabContent === tabId);
  });
}

// ── Hero ─────────────────────────────────────────────────────
function buildProfileHero(artist) {
  const hero = document.createElement('div');
  hero.className = 'profile-hero';

  const following = isFollowing(artist.id);
  const socialLinks = buildSocialLinksHTML(artist);

  hero.innerHTML = `
    <div class="profile-avatar-wrap">
      <div class="profile-avatar" style="background:${artist.avatarColor}">
        ${artist.avatarInitial}
      </div>
    </div>
    <div class="profile-name">${artist.name}</div>
    <div class="profile-craft">${artist.craft}</div>
    <div class="profile-location">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      ${artist.location}
    </div>
    <p class="profile-bio">${artist.bio}</p>
    <div class="profile-stats">
      <div class="profile-stat">
        <span class="profile-stat-value">${formatCount(artist.followersCount)}</span>
        <span class="profile-stat-label">Followers</span>
      </div>
      <div class="profile-stat">
        <span class="profile-stat-value">${artist.videos.length}</span>
        <span class="profile-stat-label">Videos</span>
      </div>
      <div class="profile-stat">
        <span class="profile-stat-value">${artist.gallery.length}</span>
        <span class="profile-stat-label">Works</span>
      </div>
    </div>
    <div class="profile-actions">
      <button id="profile-follow-btn" class="btn follow-btn profile-follow-btn ${following ? 'following' : 'not-following'}">
        ${following ? '✓ Following' : '+ Follow'}
      </button>
    </div>
    ${socialLinks ? `<div class="profile-links">${socialLinks}</div>` : ''}`;

  hero.querySelector('#profile-follow-btn').addEventListener('click', () => {
    toggleFollow(artist.id);
  });

  return hero;
}

function updateProfileFollowBtn(btn, following) {
  btn.classList.toggle('following', following);
  btn.classList.toggle('not-following', !following);
  btn.textContent = following ? '✓ Following' : '+ Follow';
}

function buildSocialLinksHTML(artist) {
  const s = artist.social;
  if (!s) return '';
  const chips = [];
  if (s.youtube) chips.push(`<a href="${s.youtube}" target="_blank" rel="noopener" class="profile-link-chip">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF0000"><path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.3 2.8 12 2.8 12 2.8s-4.3 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.2v2c0 2.1.3 4.2.3 4.2s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.6 12 21.6 12 21.6s4.3 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.2v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/></svg>
    YouTube</a>`);
  if (s.patreon) chips.push(`<a href="${s.patreon}" target="_blank" rel="noopener" class="profile-link-chip">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF424D"><circle cx="14.5" cy="9.5" r="6.5"/><rect x="2" y="2" width="4" height="20" rx="1"/></svg>
    Patreon</a>`);
  if (s.kofi) chips.push(`<a href="${s.kofi}" target="_blank" rel="noopener" class="profile-link-chip">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#29ABE0"><path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"/></svg>
    Ko-fi</a>`);
  return chips.join('');
}

// ── Videos Tab ───────────────────────────────────────────────
function buildVideosTab(artist) {
  const panel = document.createElement('div');
  panel.className = 'profile-tab-content';
  panel.dataset.tabContent = 'videos';

  const grid = document.createElement('div');
  grid.className = 'video-grid';

  artist.videos.forEach(v => {
    const card = document.createElement('div');
    card.className = 'video-thumb-card';

    if (v.type === 'youtube') {
      const thumb = v.thumbnail || `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
      card.innerHTML = `
        <div class="video-thumb-yt" style="background-image:url(${thumb})">
          <div class="video-thumb-play">${iconPlaySmall()}</div>
        </div>
        <div class="video-thumb-info">
          <div class="video-thumb-title">${v.title}</div>
          <div class="video-thumb-meta">
            <span class="yt-badge">YT</span>
            <span class="video-thumb-duration">${v.duration}</span>
            <span class="video-thumb-likes">♥ ${formatCount(v.likes)}</span>
          </div>
        </div>`;
      card.addEventListener('click', () => openVideoModal(v));
    } else {
      card.innerHTML = `
        <div class="video-thumb-local">
          <div class="video-thumb-play">${iconPlaySmall()}</div>
        </div>
        <div class="video-thumb-info">
          <div class="video-thumb-title">${v.title}</div>
          <div class="video-thumb-meta">
            <span class="video-thumb-duration">${v.duration}</span>
            <span class="video-thumb-likes">♥ ${formatCount(v.likes)}</span>
          </div>
        </div>`;
      card.addEventListener('click', () => openVideoModal(v));
    }
    grid.appendChild(card);
  });

  panel.appendChild(grid);
  return panel;
}

// ── Gallery Tab ──────────────────────────────────────────────
function buildGalleryTab(artist) {
  const panel = document.createElement('div');
  panel.className = 'profile-tab-content';
  panel.dataset.tabContent = 'gallery';

  const grid = document.createElement('div');
  grid.className = 'gallery-grid';

  artist.gallery.forEach(item => {
    const el = document.createElement('div');
    el.className = 'gallery-item';
    el.innerHTML = `
      <div class="gallery-art" style="background:${item.gradient}"></div>
      <div class="gallery-caption">
        <div class="gallery-title">${item.title}</div>
        <div class="gallery-medium">${item.medium} · ${item.year}</div>
      </div>`;
    grid.appendChild(el);
  });

  panel.appendChild(grid);
  return panel;
}

// ── Materials Tab ─────────────────────────────────────────────
function buildMaterialsTab(artist) {
  const panel = document.createElement('div');
  panel.className = 'profile-tab-content';
  panel.dataset.tabContent = 'materials';

  const intro = document.createElement('p');
  intro.className = 'text-sm text-muted';
  intro.style.marginBottom = 'var(--space-3)';
  intro.textContent = `The tools and materials ${artist.name.split(' ')[0]} uses in their work.`;
  panel.appendChild(intro);

  const list = document.createElement('div');
  list.className = 'materials-list';

  artist.materials.forEach(m => {
    const a = document.createElement('a');
    a.className = 'material-item';
    a.href = m.link;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `
      <span class="material-icon">${m.icon}</span>
      <div class="material-info">
        <div class="material-name">${m.name}<span class="material-type-badge">${m.type}</span></div>
        <div class="material-brand">${m.brand}</div>
        <div class="material-desc">${m.description}</div>
      </div>
      <svg class="material-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
    list.appendChild(a);
  });

  panel.appendChild(list);
  return panel;
}

// ── Learn Tab ─────────────────────────────────────────────────
function buildLearnTab(artist) {
  const panel = document.createElement('div');
  panel.className = 'profile-tab-content';
  panel.dataset.tabContent = 'learn';

  const intro = document.createElement('p');
  intro.className = 'text-sm text-muted';
  intro.style.marginBottom = 'var(--space-3)';
  intro.textContent = `Books and resources recommended by ${artist.name.split(' ')[0]}.`;
  panel.appendChild(intro);

  const list = document.createElement('div');
  list.className = 'books-list';

  const icons = { book: '📚', course: '🎥', resource: '🔗' };

  artist.books.forEach(b => {
    const a = document.createElement('a');
    a.className = 'book-item';
    a.href = b.link;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `
      <div class="book-spine type-${b.type}">${icons[b.type] || '📖'}</div>
      <div class="book-info">
        <div class="book-title">${b.title}</div>
        <div class="book-author">${b.author}</div>
        <div class="book-desc">${b.description}</div>
        <span class="book-type-badge type-${b.type}">${b.type}</span>
      </div>`;
    list.appendChild(a);
  });

  panel.appendChild(list);
  return panel;
}

// ── Shop Tab ──────────────────────────────────────────────────
function buildShopTab(artist) {
  const panel = document.createElement('div');
  panel.className = 'profile-tab-content';
  panel.dataset.tabContent = 'shop';

  const intro = document.createElement('p');
  intro.className = 'text-sm text-muted';
  intro.style.marginBottom = 'var(--space-3)';
  intro.textContent = `Support ${artist.name.split(' ')[0]}'s work by purchasing directly.`;
  panel.appendChild(intro);

  const shopIcons = { Digital: '📁', Prints: '🖼️', Original: '✦', Course: '🎓' };

  const grid = document.createElement('div');
  grid.className = 'shop-grid';

  artist.shop.forEach(item => {
    const el = document.createElement('div');
    el.className = 'shop-item';
    el.innerHTML = `
      <div class="shop-thumbnail">${shopIcons[item.category] || '🛍️'}</div>
      <div class="shop-info">
        <div class="shop-name">${item.item}</div>
        <div class="shop-desc">${item.description}</div>
        <div class="shop-bottom">
          <span class="shop-price">${item.price}</span>
          <span class="shop-category">${item.category}</span>
        </div>
      </div>`;
    // Show a note that shop is a demo
    el.addEventListener('click', () => {
      alert(`Demo mode: In the full ART GEM platform, this would open the checkout for "${item.item}" at ${item.price}.`);
    });
    grid.appendChild(el);
  });

  panel.appendChild(grid);
  return panel;
}

// ── Support Tab ───────────────────────────────────────────────
function buildSupportTab(artist) {
  const panel = document.createElement('div');
  panel.className = 'profile-tab-content';
  panel.dataset.tabContent = 'support';

  const section = document.createElement('div');
  section.className = 'support-section';

  const links = buildSupportLinksHTML(artist);
  const following = isFollowing(artist.id);

  section.innerHTML = `
    <div class="support-gem">💎</div>
    <div class="support-title">Support ${artist.name.split(' ')[0]}'s Work</div>
    <p class="support-desc">${artist.supportNote}</p>
    <div class="support-links">${links}</div>
    <div class="support-follow-cta">
      <p>Following an artist on ART GEM helps them get discovered by more people who love what they create.</p>
      <button id="support-follow-btn" class="btn follow-btn ${following ? 'following' : 'not-following'}" style="width:100%">
        ${following ? '✓ Following ' + artist.name.split(' ')[0] : '+ Follow ' + artist.name.split(' ')[0]}
      </button>
    </div>`;

  section.querySelector('#support-follow-btn').addEventListener('click', () => {
    toggleFollow(artist.id);
  });

  panel.appendChild(section);
  return panel;
}

function buildSupportLinksHTML(artist) {
  const links = [];
  if (artist.supportUrl) {
    if (artist.supportUrl.includes('patreon')) {
      links.push(`<a href="${artist.supportUrl}" target="_blank" rel="noopener" class="support-link patreon">❤️ Support on Patreon</a>`);
    } else if (artist.supportUrl.includes('ko-fi')) {
      links.push(`<a href="${artist.supportUrl}" target="_blank" rel="noopener" class="support-link kofi">☕ Support on Ko-fi</a>`);
    }
  }
  if (artist.social?.youtube) {
    links.push(`<a href="${artist.social.youtube}" target="_blank" rel="noopener" class="support-link youtube">▶ Subscribe on YouTube</a>`);
  }
  if (!links.length) {
    links.push(`<a href="#" class="support-link default" onclick="return false">🛍️ Visit the Shop</a>`);
  }
  return links.join('');
}

// ── Video modal ───────────────────────────────────────────────
function openVideoModal(v) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'modal-video';

  let playerEl;
  if (v.type === 'youtube' && v.youtubeId) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('title', 'YouTube video player');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', '');
    iframe.src = `https://www.youtube.com/embed/${v.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
    iframe.style.width = '100%';
    iframe.style.aspectRatio = '9/16';
    iframe.style.border = 'none';
    iframe.style.display = 'block';
    playerEl = iframe;
  } else {
    const video = document.createElement('video');
    video.src = v.src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.style.width = '100%';
    video.style.aspectRatio = '9/16';
    video.style.display = 'block';
    playerEl = video;
  }
  modal.appendChild(playerEl);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal-close';
  closeBtn.innerHTML = '✕';
  closeBtn.setAttribute('aria-label', 'Close video');
  closeBtn.addEventListener('click', () => {
    if (playerEl.pause) playerEl.pause();
    overlay.classList.add('closing');
    setTimeout(() => overlay.remove(), 200);
  });
  modal.appendChild(closeBtn);

  overlay.appendChild(modal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      if (playerEl.pause) playerEl.pause();
      overlay.classList.add('closing');
      setTimeout(() => overlay.remove(), 200);
    }
  });

  document.body.appendChild(overlay);
}

// ── Shared icon helpers ───────────────────────────────────────
function iconBack() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
}

function iconPlaySmall() {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>`;
}
