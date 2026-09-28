// ============================================================
// ART GEM — Router
// Hash-based SPA router. No server config needed for GitHub Pages.
// ============================================================

class Router {
  constructor() {
    this._routes = [];
    this._beforeEach = null;
  }

  /** Register a route. Pattern supports :param segments. */
  on(pattern, handler) {
    this._routes.push({ pattern: pattern.split('/'), handler });
    return this;
  }

  /** Hook called before every navigation. */
  beforeEach(fn) {
    this._beforeEach = fn;
    return this;
  }

  /** Navigate programmatically. */
  navigate(path) {
    window.location.hash = path;
  }

  /** Go back in browser history. */
  back() {
    window.history.back();
  }

  /** Match a path string against all registered routes. */
  _match(path) {
    const parts = path.split('/').filter(Boolean);
    for (const route of this._routes) {
      const pattern = route.pattern.filter(Boolean);
      if (pattern.length !== parts.length) continue;
      const params = {};
      let matched = true;
      for (let i = 0; i < pattern.length; i++) {
        if (pattern[i].startsWith(':')) {
          params[pattern[i].slice(1)] = decodeURIComponent(parts[i]);
        } else if (pattern[i] !== parts[i]) {
          matched = false;
          break;
        }
      }
      if (matched) return { handler: route.handler, params };
    }
    return null;
  }

  /** Dispatch current hash. */
  _dispatch() {
    const raw  = window.location.hash.slice(1) || 'feed';
    const path = raw.replace(/^\//, '');

    if (this._beforeEach) this._beforeEach(path);

    const result = this._match(path);
    if (result) {
      result.handler(result.params);
    } else {
      // Default: feed
      const fallback = this._match('feed');
      if (fallback) fallback.handler({});
    }
  }

  /** Start listening. */
  start() {
    window.addEventListener('hashchange', () => this._dispatch());
    this._dispatch();
  }
}

const router = new Router();
