<script setup lang="ts">
import type { NuxtError } from '#app'

const { resolveCanonical } = useSite()

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Page not found',
  description: 'The page you requested is not available on the UnmarkedAI Blog.',
  ogUrl: resolveCanonical('/404')
})
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error">
            <template #actions>
              <div class="flex flex-wrap gap-3">
                <UButton to="/">
                  Back to blog
                </UButton>
                <UButton
                  color="neutral"
                  variant="outline"
                  to="https://unmarkedai.com"
                  target="_blank"
                >
                  Open main site
                </UButton>
              </div>
            </template>
          </UError>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <UToaster />
  </div>
</template>
