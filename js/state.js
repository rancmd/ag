// ============================================================
// ART GEM — State Management
// Persists follows & likes to localStorage.
// ============================================================

const STATE_KEY = 'artgem_state_v1';

function _loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        follows: new Set(parsed.follows || []),
        likes: new Set(parsed.likes || []),
      };
    }
  } catch (e) { /* ignore */ }
  return { follows: new Set(), likes: new Set() };
}

function _saveState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify({
      follows: [...AppState.follows],
      likes:   [...AppState.likes],
    }));
  } catch (e) { /* ignore */ }
}

function _emit(detail) {
  document.dispatchEvent(new CustomEvent('artgem:statechange', { detail }));
}

const AppState = _loadState();

// ── Follows ──────────────────────────────────────────────────

function toggleFollow(artistId) {
  if (AppState.follows.has(artistId)) {
    AppState.follows.delete(artistId);
  } else {
    AppState.follows.add(artistId);
  }
  _saveState();
  _emit({ type: 'follow', artistId, following: AppState.follows.has(artistId) });
}

function isFollowing(artistId) {
  return AppState.follows.has(artistId);
}

function getFollowedArtistIds() {
  return [...AppState.follows];
}

// ── Likes ────────────────────────────────────────────────────

function toggleLike(videoId) {
  if (AppState.likes.has(videoId)) {
    AppState.likes.delete(videoId);
  } else {
    AppState.likes.add(videoId);
  }
  _saveState();
  _emit({ type: 'like', videoId, liked: AppState.likes.has(videoId) });
}

function isLiked(videoId) {
  return AppState.likes.has(videoId);
}
