// https://nuxt.com/docs/api/configuration/nuxt-config

import { presetAttributify, presetUno } from "unocss";

// import { presetUno, presetAttributify } from 'unocss'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: !true },
  imports: { autoImport: false },
  spaLoadingTemplate: false,
  // ssr: false,
  modules: [
    '@unocss/nuxt', 
    '@sidebase/nuxt-auth'
  ],
  unocss: {
    preflight: true,
    presets: [
      presetUno(),
      presetAttributify(),
    ]
  },
  auth: {
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: {
      isEnabled: !true
    },
    // baseURL: `http://localhost:${process.env.PORT || 3000}`
    // baseURL: 'https://refactored-journey-49xr557wvww25j7r-3000.app.github.dev'
    baseURL: process.env.BASE_URL
  },
  routeRules: {
    '/with-caching': {
      swr: 86400000,
      auth: {
        disableServerSideAuth: true
      }
    },
    // '/': {
    //   redirect: '/browse/Color?filter=Red'
    // }
  },
  //  vite: {
  //   server: {
  //     hmr: {
  //       protocol: 'ws'
  //     }
  //   }
  // }
})