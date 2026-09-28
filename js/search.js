// ============================================================
// ART GEM — Search / Discover Page (search.js)
// ============================================================

let searchDebounceTimer = null;
let activeCategory = 'all';

function renderSearch() {
  const page = document.getElementById('page-search');
  page.innerHTML = '';
  activeCategory = 'all';

  // ── Header ───────────────────────────────────────────────
  const header = document.createElement('div');
  header.className = 'search-header';
  header.innerHTML = `
    <div class="search-header-top">
      <div class="search-logo">
        ${logoSVG(24, 'var(--color-primary)')}
        <span class="logo-wordmark">ART GEM</span>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-3)">
      <div class="search-input-wrap" style="flex:1">
        <span class="search-input-icon">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
        <input class="search-input" id="search-input" type="search" placeholder="Search artists, styles, materials…" autocomplete="off" autocorrect="off" spellcheck="false" />
        <button class="search-clear-btn" id="search-clear" aria-label="Clear search">✕</button>
      </div>
    </div>
    <div class="search-categories" id="search-chips"></div>`;
  page.appendChild(header);

  // ── Categories ───────────────────────────────────────────
  const chipsContainer = header.querySelector('#search-chips');
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `search-chip${cat.id === 'all' ? ' active' : ''}`;
    btn.dataset.cat = cat.id;
    btn.innerHTML = `<span>${cat.icon}</span> ${cat.label}`;
    btn.addEventListener('click', () => {
      activeCategory = cat.id;
      chipsContainer.querySelectorAll('.search-chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      runSearch();
    });
    chipsContainer.appendChild(btn);
  });

  // ── Body ─────────────────────────────────────────────────
  const body = document.createElement('div');
  body.className = 'search-body';
  body.id = 'search-body';
  page.appendChild(body);

  // ── Input handler ────────────────────────────────────────
  const input = header.querySelector('#search-input');
  const clearBtn = header.querySelector('#search-clear');

  input.addEventListener('input', () => {
    clearBtn.classList.toggle('visible', input.value.length > 0);
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(runSearch, 250);
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.classList.remove('visible');
    runSearch();
  });

  // Initial: show browse (all artists)
  showBrowse(body);
}

function runSearch() {
  const input = document.getElementById('search-input');
  const body = document.getElementById('search-body');
  if (!input || !body) return;

  const q = input.value.trim();
  if (!q && activeCategory === 'all') {
    showBrowse(body);
    return;
  }

  const { artists, videos } = searchContent(q, activeCategory);
  showResults(body, artists, videos, q);
}

// ── Browse state (default, no query) ────────────────────────
function showBrowse(body) {
  body.innerHTML = '';
  const browse = document.createElement('div');
  browse.className = 'search-browse page-enter';

  browse.innerHTML = `
    <div class="search-browse-title">Discover Artists</div>
    <div class="search-browse-sub">Explore creative work across all disciplines.</div>`;

  const grid = document.createElement('div');
  grid.className = 'artists-browse-grid';

  getAllArtists().forEach(artist => {
    const card = document.createElement('div');
    card.className = 'artist-browse-card';
    card.innerHTML = `
      <div class="avatar avatar-md" style="background:${artist.avatarColor}">${artist.avatarInitial}</div>
      <div class="artist-browse-name">${artist.name}</div>
      <div class="artist-browse-craft">${artist.craft}</div>
      <div class="artist-browse-followers">${formatCount(artist.followersCount)} followers</div>`;
    card.addEventListener('click', () => {
      router.navigate(`artist/${artist.id}`);
    });
    grid.appendChild(card);
  });

  browse.appendChild(grid);
  body.appendChild(browse);
}

// ── Results state ─────────────────────────────────────────────
function showResults(body, artists, videos, query) {
  body.innerHTML = '';

  if (!artists.length && !videos.length) {
    body.innerHTML = `
      <div class="no-results page-enter">
        <div class="no-results-icon">🔍</div>
        <div class="no-results-text">No results for "${query}"</div>
        <p class="text-sm text-muted">Try a different search — artists, styles, materials, or techniques.</p>
      </div>`;
    return;
  }

  const results = document.createElement('div');
  results.className = 'search-results page-enter';

  // Artists section
  if (artists.length) {
    const section = document.createElement('div');
    section.innerHTML = `<div class="results-section-title">Artists (${artists.length})</div>`;
    const artistsGrid = document.createElement('div');
    artistsGrid.className = 'artists-grid';
    artists.forEach(artist => {
      const card = document.createElement('div');
      card.className = 'artist-result-card';
      card.innerHTML = `
        <div class="avatar avatar-md" style="background:${artist.avatarColor}">${artist.avatarInitial}</div>
        <div class="artist-result-info">
          <div class="artist-result-name">${artist.name}</div>
          <div class="artist-result-craft">${artist.craft}</div>
          <div class="artist-result-tags">
            ${artist.tags.slice(0, 3).map(t => `<span class="tag">#${t}</span>`).join('')}
          </div>
        </div>
        <div class="artist-result-followers">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="opacity:.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          ${formatCount(artist.followersCount)}
        </div>`;
      card.addEventListener('click', () => router.navigate(`artist/${artist.id}`));
      artistsGrid.appendChild(card);
    });
    section.appendChild(artistsGrid);
    results.appendChild(section);
  }

  // Videos section
  if (videos.length) {
    const section = document.createElement('div');
    section.innerHTML = `<div class="results-section-title">Videos (${videos.length})</div>`;
    const videosList = document.createElement('div');
    videosList.className = 'videos-list';

    videos.forEach(v => {
      const card = document.createElement('div');
      card.className = 'video-result-card';

      let thumbHTML = '';
      if (v.type === 'youtube') {
        const thumb = v.thumbnail || `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
        thumbHTML = `<div class="video-result-thumb yt-thumb" style="background-image:url(${thumb})">
          <div class="play-icon-small">${iconPlaySmall()}</div>
        </div>`;
      } else {
        thumbHTML = `<div class="video-result-thumb local-thumb">🎬</div>`;
      }

      card.innerHTML = `
        ${thumbHTML}
        <div class="video-result-info">
          <div class="video-result-artist">${v.artist.name}</div>
          <div class="video-result-title">${v.title}</div>
          <div class="video-result-tags">
            ${v.tags.slice(0, 3).map(t => `<span class="tag">#${t}</span>`).join('')}
          </div>
        </div>`;

      card.addEventListener('click', () => {
        if (v.type === 'youtube') {
          window.open(`https://www.youtube.com/watch?v=${v.youtubeId}`, '_blank', 'noopener');
        } else {
          openVideoModal(v);
        }
      });
      videosList.appendChild(card);
    });

    section.appendChild(videosList);
    results.appendChild(section);
  }

  body.appendChild(results);
}
