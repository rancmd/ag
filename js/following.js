// ============================================================
// ART GEM — Following Page (following.js)
// ============================================================

function renderFollowing() {
  const page = document.getElementById('page-following');
  page.innerHTML = '';

  const followedIds = getFollowedArtistIds();
  const followedArtists = followedIds.map(id => getArtist(id)).filter(Boolean);

  // ── Header ───────────────────────────────────────────────
  const header = document.createElement('div');
  header.className = 'following-header';
  header.innerHTML = `
    <div class="following-header-left">
      <div class="following-header-logo">
        ${logoSVG(24, 'var(--color-primary)')}
        <span class="logo-wordmark">ART GEM</span>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:var(--space-2)">
      <span class="following-header-title">Following</span>
      ${followedArtists.length ? `<span class="following-count-badge">${followedArtists.length}</span>` : ''}
    </div>`;
  page.appendChild(header);

  // ── Body ─────────────────────────────────────────────────
  if (followedArtists.length === 0) {
    // Empty state
    const empty = document.createElement('div');
    empty.className = 'following-empty page-enter';
    empty.innerHTML = `
      <div class="following-empty-gem">💎</div>
      <div class="following-empty-title">Your creative feed awaits</div>
      <p class="following-empty-desc">Follow artists you love and their latest work will appear here.</p>
      <button class="btn btn-primary" id="explore-btn" style="margin-top:var(--space-2)">Discover Artists →</button>`;
    empty.querySelector('#explore-btn').addEventListener('click', () => {
      router.navigate('search');
    });
    page.appendChild(empty);
    return;
  }

  const body = document.createElement('div');
  body.className = 'following-body page-enter';
  page.appendChild(body);

  // ── Artist bubbles row ────────────────────────────────────
  const artistsSection = document.createElement('div');
  artistsSection.innerHTML = `<div class="following-artists-title">Artists You Follow</div>`;

  const row = document.createElement('div');
  row.className = 'following-artists-row';

  followedArtists.forEach(artist => {
    const bubble = document.createElement('div');
    bubble.className = 'following-artist-bubble';
    bubble.innerHTML = `
      <div class="following-bubble-avatar" style="background:${artist.avatarColor}">${artist.avatarInitial}</div>
      <div class="following-bubble-name">${artist.name.split(' ')[0]}</div>`;
    bubble.addEventListener('click', () => router.navigate(`artist/${artist.id}`));
    row.appendChild(bubble);
  });

  artistsSection.appendChild(row);
  body.appendChild(artistsSection);

  // ── Recent videos from followed artists ───────────────────
  const videosSection = document.createElement('div');
  videosSection.innerHTML = `<div class="following-videos-title">Recent Work</div>`;

  const videosList = document.createElement('div');
  videosList.className = 'following-videos-list';

  // Collect all videos from followed artists, interleaved
  const allVideos = [];
  const maxPerArtist = 3;
  const maxSlots = maxPerArtist * followedArtists.length;

  for (let i = 0; i < maxSlots; i++) {
    const artistIndex = i % followedArtists.length;
    const videoIndex = Math.floor(i / followedArtists.length);
    const artist = followedArtists[artistIndex];
    if (artist.videos[videoIndex]) {
      allVideos.push({ ...artist.videos[videoIndex], artist });
    }
  }

  allVideos.forEach(v => {
    const card = document.createElement('div');
    card.className = 'following-video-card';

    let thumbHTML = '';
    if (v.type === 'youtube') {
      const thumb = v.thumbnail || `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
      thumbHTML = `<div class="following-video-thumb yt-thumb" style="background-image:url(${thumb})">
        <div class="play-badge">${iconPlaySmall()}</div>
      </div>`;
    } else {
      thumbHTML = `<div class="following-video-thumb local-thumb" style="background:linear-gradient(135deg,${v.artist.avatarColor}55,${v.artist.avatarColor})">
        <div class="play-badge">${iconPlaySmall()}</div>
      </div>`;
    }

    card.innerHTML = `
      ${thumbHTML}
      <div class="following-video-info">
        <div class="following-video-artist">
          <div class="following-video-artist-avatar" style="background:${v.artist.avatarColor}">${v.artist.avatarInitial}</div>
          <span class="following-video-artist-name">${v.artist.name}</span>
        </div>
        <div class="following-video-title">${v.title}</div>
        <div class="following-video-meta">
          <span>${v.duration}</span>
          <span>·</span>
          <span>♥ ${formatCount(v.likes)}</span>
          ${v.type === 'youtube' ? '<span>· YouTube</span>' : ''}
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

  videosSection.appendChild(videosList);
  body.appendChild(videosSection);
}
