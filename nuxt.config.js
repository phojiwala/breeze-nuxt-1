import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", 'shadcn-nuxt', '@nuxt/image', '@vite-pwa/nuxt'],

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Your App Name',
      short_name: 'App',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: '/images/.*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
      ],
    },
  },

  // image: {
  //   providers: {
  //     customBackend: {
  //       name: 'customBackend',
  //       provider: 'ipx',
  //       options: {
  //         baseURL: process.env.NUXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
  //         modifiers: {
  //           format: 'original'
  //         }
  //       }
  //     }
  //   }
  // },

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  runtimeConfig: {
    public: {
      backendUrl: "http://localhost:8000",
      frontendUrl: "http://localhost:3000",
    },
  },

  imports: {
    dirs: ["./utils"],
  },

  experimental: {
    asyncContext: true,
  },

  compatibilityDate: "2024-07-09"
});