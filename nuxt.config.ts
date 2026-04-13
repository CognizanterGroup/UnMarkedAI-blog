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
    plugins: [microfrontends()] // 👈 ADD THIS
  },

  app: {
    baseURL: '/blog/',
  }
})
