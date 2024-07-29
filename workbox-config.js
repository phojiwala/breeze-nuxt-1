import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Cache images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

// Allowlist for navigation routes
const navigationRouteAllowlist = [
  new RegExp('/images/.*'), // Allow navigation to image URLs
  // Add other routes as needed
];

// Register the navigation route
registerRoute(
  ({ request, url }) => {
    if (request.mode === 'navigate') {
      return navigationRouteAllowlist.some((regex) => regex.test(url.pathname));
    }
    return false;
  },
  new NetworkFirst({
    cacheName: 'navigation-cache',
  })
);