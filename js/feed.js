// ============================================================
// ART GEM — Feed Page (feed.js)
// Vertical scroll-snap feed with YouTube embed autoplay & sound controls.
// ============================================================

let feedObserver = null;
let feedIsMuted = true; // Required true for mobile autoplay policy

function renderFeed() {
  const page = document.getElementById('page-feed');
  page.innerHTML = '';

  // ── Feed scroll container ───────────────────────────────
  const feed = document.createElement('div');
  feed.className = 'feed';
  feed.id = 'feed-scroll';
  page.appendChild(feed);

  const videos = getFeedVideos();
  videos.forEach(v => {
    feed.appendChild(buildFeedCard(v));
  });

  // ── IntersectionObserver for Autoplay ──────────────────
  if (feedObserver) feedObserver.disconnect();

  feedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const card = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        playFeedCard(card);
      } else if (!entry.isIntersecting || entry.intersectionRatio < 0.4) {
        pauseFeedCard(card);
      }
    });
  }, { root: feed, threshold: [0.35, 0.6] });

  feed.querySelectorAll('.feed-card').forEach(card => {
    feedObserver.observe(card);
  });

  // ── State change listener (update follow/like buttons) ──
  document.addEventListener('artgem:statechange', onFeedStateChange);
}

function cleanupFeed() {
  if (feedObserver) {
    feedObserver.disconnect();
    feedObserver = null;
  }
  // Pause all playing videos
  document.querySelectorAll('#feed-scroll .feed-card').forEach(card => {
    pauseFeedCard(card);
  });
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
  card.dataset.cardType = v.type;

  if (v.type === 'youtube' && v.youtubeId) {
    // ── YouTube Embed Wrapper with instant poster ───────────
    card.dataset.youtubeId = v.youtubeId;
    const wrap = document.createElement('div');
    wrap.className = 'feed-yt-wrap';

    const poster = document.createElement('div');
    poster.className = 'feed-yt-poster';
    const thumbUrl = v.thumbnail || `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
    poster.style.backgroundImage = `url("${thumbUrl}")`;
    wrap.appendChild(poster);

    card.appendChild(wrap);
  } else {
    // ── Local Video Element ─────────────────────────────────
    const video = document.createElement('video');
    video.className = 'feed-video';
    video.src = v.src;
    video.muted = feedIsMuted;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.preload = 'metadata';
    card.appendChild(video);
  }

  // ── Tap card to toggle play/pause ─────────────────────────
  card.addEventListener('click', (e) => {
    if (e.target.closest('.feed-artist-btn') || e.target.closest('.feed-right')) return;
    toggleCardPlayback(card);
  });

  // ── Gradient overlay ──────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.className = 'feed-overlay';
  card.appendChild(overlay);

  // ── Pause indicator ───────────────────────────────────────
  const pauseIndicator = document.createElement('div');
  pauseIndicator.className = 'feed-pause-indicator';
  pauseIndicator.innerHTML = `<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;
  card.appendChild(pauseIndicator);

  // ── Bottom info bar ───────────────────────────────────────
  const bottom = document.createElement('div');
  bottom.className = 'feed-bottom';

  // Left side: Artist info + Title + Tags
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

  // Right side: Like + Sound + Follow
  const right = document.createElement('div');
  right.className = 'feed-right';

  // Mute / Unmute Button
  const muteBtn = document.createElement('button');
  muteBtn.className = 'feed-action-btn feed-mute-btn';
  muteBtn.setAttribute('aria-label', feedIsMuted ? 'Unmute' : 'Mute');
  muteBtn.innerHTML = feedIsMuted ? iconVolumeMute() : iconVolume();
  muteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFeedMute();
  });

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

  right.appendChild(muteBtn);
  right.appendChild(likeBtn);
  right.appendChild(followBtn);

  bottom.appendChild(left);
  bottom.appendChild(right);
  card.appendChild(bottom);

  return card;
}

// ── Play / Pause Card Controls ───────────────────────────────
function playFeedCard(card) {
  if (card.dataset.cardType === 'youtube' && card.dataset.youtubeId) {
    const wrap = card.querySelector('.feed-yt-wrap');
    if (!wrap) return;

    let iframe = wrap.querySelector('iframe');
    if (!iframe) {
      // Mount iframe with autoplay
      iframe = document.createElement('iframe');
      iframe.className = 'feed-yt-iframe';
      iframe.setAttribute('title', 'YouTube video player');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      const muteParam = feedIsMuted ? 1 : 0;
      iframe.src = `https://www.youtube.com/embed/${card.dataset.youtubeId}?autoplay=1&mute=${muteParam}&playsinline=1&enablejsapi=1&controls=0&loop=1&playlist=${card.dataset.youtubeId}&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1`;
      iframe.onload = () => {
        const poster = wrap.querySelector('.feed-yt-poster');
        if (poster) poster.classList.add('loaded');
      };
      wrap.appendChild(iframe);
    } else {
      // Resume already mounted player
      sendYTCommand(iframe, 'playVideo');
      sendYTCommand(iframe, feedIsMuted ? 'mute' : 'unMute');
    }
    card.dataset.playing = 'true';
  } else {
    const video = card.querySelector('video');
    if (video) {
      video.muted = feedIsMuted;
      video.play().catch(() => {});
      card.dataset.playing = 'true';
    }
  }
}

function pauseFeedCard(card) {
  if (card.dataset.cardType === 'youtube') {
    const iframe = card.querySelector('.feed-yt-iframe');
    if (iframe) {
      sendYTCommand(iframe, 'pauseVideo');
    }
  } else {
    const video = card.querySelector('video');
    if (video && !video.paused) {
      video.pause();
    }
  }
  card.dataset.playing = 'false';
}

function toggleCardPlayback(card) {
  const isPlaying = card.dataset.playing === 'true';
  const indicator = card.querySelector('.feed-pause-indicator');

  if (isPlaying) {
    pauseFeedCard(card);
    if (indicator) {
      indicator.innerHTML = `<svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>`;
      indicator.classList.add('show');
      setTimeout(() => indicator.classList.remove('show'), 700);
    }
  } else {
    playFeedCard(card);
    if (indicator) {
      indicator.innerHTML = `<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;
      indicator.classList.add('show');
      setTimeout(() => indicator.classList.remove('show'), 600);
    }
  }
}

// ── Global Sound Toggle ──────────────────────────────────────
function toggleFeedMute() {
  feedIsMuted = !feedIsMuted;

  // Update all mute button icons in DOM
  document.querySelectorAll('.feed-mute-btn').forEach(btn => {
    btn.innerHTML = feedIsMuted ? iconVolumeMute() : iconVolume();
    btn.setAttribute('aria-label', feedIsMuted ? 'Unmute' : 'Mute');
  });

  // Apply to currently active cards
  document.querySelectorAll('#feed-scroll .feed-card').forEach(card => {
    if (card.dataset.playing === 'true') {
      const iframe = card.querySelector('.feed-yt-iframe');
      if (iframe) {
        sendYTCommand(iframe, feedIsMuted ? 'mute' : 'unMute');
      }
      const video = card.querySelector('video');
      if (video) {
        video.muted = feedIsMuted;
      }
    }
  });
}

function sendYTCommand(iframe, func, args = '') {
  try {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: func,
        args: args
      }), '*');
    }
  } catch (e) {}
}

// ── Update like button display ───────────────────────────────
function updateFeedLikeBtn(btn, liked, videoId, baseLikes) {
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

// ── SVG helpers ──────────────────────────────────────────────
function iconVolume() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
}

function iconVolumeMute() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
}
