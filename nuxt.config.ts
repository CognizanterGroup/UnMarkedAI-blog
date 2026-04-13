import { defineNuxtConfig } from 'nuxt/config'
import { microfrontends } from '@vercel/microfrontends/experimental/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image'
  ],

  vite: {
    base: '/blog/',
    plugins: [microfrontends()]
  },

  app: {
    baseURL: '/blog/',
  }
})
