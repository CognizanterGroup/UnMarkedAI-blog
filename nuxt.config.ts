import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-07-11',

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://unmarkedai.com/blog'
    }
  },

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/blog/',
    buildAssetsDir: '/_nuxt/'
  },

  vite: {
    plugins: [tailwindcss()],
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
