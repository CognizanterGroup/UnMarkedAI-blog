<script setup lang="ts">
const colorMode = useColorMode()
const { siteDescription, siteName, withBaseAsset, resolveCanonical } = useSite()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')
const favicon = computed(() => withBaseAsset('/favicon.ico'))
const defaultOgImage = computed(() => resolveCanonical('/og-cover.svg'))

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: favicon }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: title => title ? `${title} | ${siteName}` : siteName,
  description: siteDescription,
  ogDescription: siteDescription,
  ogImage: defaultOgImage,
  ogSiteName: siteName,
  twitterCard: 'summary_large_image',
  twitterDescription: siteDescription,
  twitterImage: defaultOgImage,
  twitterTitle: siteName
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
