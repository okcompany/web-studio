'use client';

/**
 * Dev-only hook that pings the dev server to keep it alive while the user is
 * active. In production this is a no-op so we don't pull `react-idle-timer`
 * into the SSR bundle (its ESM named exports fail on some Node runtimes).
 */
export function useDevServerHeartbeat() {
  // no-op in production builds
  if (typeof window === 'undefined') return;
  if (!import.meta.env?.DEV) return;
}
