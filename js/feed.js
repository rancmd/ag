// ============================================================
// ART GEM — Feed Page (feed.js)
// Vertical scroll-snap video feed with autoplay.
// ============================================================

let feedObserver = null;

function renderFeed() {
  const page = document.getElementById('page-feed');
  page.innerHTML = '';

  // ── Feed header (logo overlay) ──────────────────────────
  const header = document.createElement('div');
  header.className = 'feed-header';
  header.innerHTML = `
    <div class="feed-logo">
      ${logoSVG(28, '#fff')}
      <span class="feed-logo-text">ART GEM</span>
    </div>`;
  page.appendChild(header);

  // ── Feed scroll container ───────────────────────────────
  const feed = document.createElement('div');
  feed.className = 'feed';
  feed.id = 'feed-scroll';
  page.appendChild(feed);

  const videos = getFeedVideos();
  videos.forEach(v => {
    feed.appendChild(buildFeedCard(v));
  });

  // ── IntersectionObserver for autoplay ──────────────────
  if (feedObserver) feedObserver.disconnect();

  feedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const card = entry.target;
      const video = card.querySelector('video');
      if (!video) return;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { root: feed, threshold: 0.6 });

  feed.querySelectorAll('.feed-card').forEach(card => {
    feedObserver.observe(card);
  });

  // ── State change listener (update follow/like buttons) ──
  document.addEventListener('artgem:statechange', onFeedStateChange);
}

function cleanupFeed() {
  if (feedObserver) { feedObserver.disconnect(); feedObserver = null; }
  // Pause all videos
  document.querySelectorAll('#feed-scroll video').forEach(v => v.pause());
  document.removeEventListener('artgem:statechange', onFeedStateChange);
}

function onFeedStateChange(e) {
  const { type, artistId, videoId, following, liked } = e.detail;
  if (type === 'follow') {
    document.querySelectorAll(`.feed-follow-btn[data-artist-id="${artistId}"]`).forEach(btn => {
      updateFeedFollowBtn(btn, following);
    });
  }
  if (type === 'like') {
    document.querySelectorAll(`.feed-action-btn.like-btn[data-video-id="${videoId}"]`).forEach(btn => {
      updateFeedLikeBtn(btn, liked, videoId);
    });
  }
}

// ── Build a single feed card ─────────────────────────────────
function buildFeedCard(v) {
  const artist = v.artist;
  const card = document.createElement('div');
  card.className = 'feed-card';
  card.dataset.videoId = v.id;
  card.dataset.artistId = artist.id;

  if (v.type === 'local') {
    // ── Local video
    const video = document.createElement('video');
    video.className = 'feed-video';
    video.src = v.src;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.preload = 'metadata';
    card.appendChild(video);

    // Tap card to play/pause
    card.addEventListener('click', (e) => {
      if (e.target.closest('.feed-artist-btn') || e.target.closest('.feed-right')) return;
      toggleVideoPlayPause(video, card);
    });

  } else {
    // ── YouTube thumbnail card
    const thumb = v.thumbnail || `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
    const bg = document.createElement('div');
    bg.className = 'feed-yt-bg';
    bg.style.backgroundImage = `url(${thumb})`;
    card.appendChild(bg);

    const center = document.createElement('div');
    center.className = 'feed-yt-center';
    center.innerHTML = `
      <button class="feed-yt-play-btn" aria-label="Watch on YouTube">
        ${iconPlay()}
      </button>
      <div class="feed-yt-label">▶ Watch on YouTube</div>`;
    card.appendChild(center);

    // Open YouTube on click (not on artist/action buttons)
    card.addEventListener('click', (e) => {
      if (e.target.closest('.feed-artist-btn') || e.target.closest('.feed-right')) return;
      window.open(`https://www.youtube.com/watch?v=${v.youtubeId}`, '_blank', 'noopener');
    });
  }

  // ── Gradient overlay
  const overlay = document.createElement('div');
  overlay.className = 'feed-overlay';
  card.appendChild(overlay);

  // ── Pause indicator
  const pauseIndicator = document.createElement('div');
  pauseIndicator.className = 'feed-pause-indicator';
  pauseIndicator.innerHTML = `<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;
  card.appendChild(pauseIndicator);

  // ── Bottom info
  const bottom = document.createElement('div');
  bottom.className = 'feed-bottom';

  // Left side
  const left = document.createElement('div');
  left.className = 'feed-left';

  const artistBtn = document.createElement('button');
  artistBtn.className = 'feed-artist-btn';
  artistBtn.dataset.artistId = artist.id;
  artistBtn.setAttribute('aria-label', `View ${artist.name}'s profile`);
  artistBtn.innerHTML = `
    <div class="feed-avatar" style="background:${artist.avatarColor}">${artist.avatarInitial}</div>
    <div>
      <div class="feed-artist-name">${artist.name}</div>
      <div class="feed-artist-craft">${artist.craft}</div>
    </div>`;
  artistBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cleanupFeed();
    router.navigate(`artist/${artist.id}`);
  });

  const titleEl = document.createElement('div');
  titleEl.className = 'feed-video-title';
  titleEl.textContent = v.title;

  const tagsEl = document.createElement('div');
  tagsEl.className = 'feed-video-tags';
  tagsEl.innerHTML = v.tags.slice(0, 4).map(t => `<span class="feed-tag">#${t}</span>`).join('');

  left.appendChild(artistBtn);
  left.appendChild(titleEl);
  left.appendChild(tagsEl);

  // Right side actions
  const right = document.createElement('div');
  right.className = 'feed-right';

  // Like button
  const liked = isLiked(v.id);
  const likeBtn = document.createElement('button');
  likeBtn.className = `feed-action-btn like-btn${liked ? ' liked' : ''}`;
  likeBtn.dataset.videoId = v.id;
  likeBtn.setAttribute('aria-label', 'Like');
  updateFeedLikeBtn(likeBtn, liked, v.id, v.likes);
  likeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLike(v.id);
  });

  // Follow button
  const following = isFollowing(artist.id);
  const followBtn = document.createElement('button');
  followBtn.className = `feed-follow-btn ${following ? 'following' : 'not-following'}`;
  followBtn.dataset.artistId = artist.id;
  followBtn.textContent = following ? '✓ Following' : '+ Follow';
  followBtn.setAttribute('aria-label', following ? 'Unfollow' : 'Follow');
  followBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFollow(artist.id);
  });

  right.appendChild(likeBtn);
  right.appendChild(followBtn);

  bottom.appendChild(left);
  bottom.appendChild(right);
  card.appendChild(bottom);

  return card;
}

// ── Update like button display ───────────────────────────────
function updateFeedLikeBtn(btn, liked, videoId, baseLikes) {
  // baseLikes is passed on first render; fall back to data lookup on state-change events
  const base = (baseLikes !== undefined) ? baseLikes : (getVideo(videoId)?.likes || 0);
  const displayCount = formatCount(liked ? base + 1 : base);
  btn.classList.toggle('liked', liked);
  btn.innerHTML = `
    <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    <span class="feed-action-count">${displayCount}</span>`;
}

// ── Update follow button display ─────────────────────────────
function updateFeedFollowBtn(btn, following) {
  btn.classList.toggle('following', following);
  btn.classList.toggle('not-following', !following);
  btn.textContent = following ? '✓ Following' : '+ Follow';
}

// ── Play/pause toggle ────────────────────────────────────────
function toggleVideoPlayPause(video, card) {
  const indicator = card.querySelector('.feed-pause-indicator');
  if (video.paused) {
    video.play().catch(() => {});
    if (indicator) { indicator.classList.add('show'); setTimeout(() => indicator.classList.remove('show'), 600); }
  } else {
    video.pause();
    if (indicator) { indicator.classList.add('show'); setTimeout(() => indicator.classList.remove('show'), 800); }
  }
}

// ── SVG helpers ──────────────────────────────────────────────
function iconPlay() {
  return `<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" style="fill:var(--color-primary);margin-left:3px"><polygon points="5,3 19,12 5,21"/></svg>`;
}
