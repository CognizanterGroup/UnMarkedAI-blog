<script setup lang="ts">
const route = useRoute()
const { siteName } = useSite()

const items = computed(() => [{
  label: 'All posts',
  to: '/',
  active: route.path === '/'
}, {
  label: 'About UnmarkedAI',
  to: 'https://unmarkedai.com',
  target: '_blank'
}])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton />

      <UButton
        :label="siteName"
        icon="i-lucide-sparkles"
        trailing-icon="i-lucide-arrow-right"
        class="hidden lg:inline-flex"
        to="https://unmarkedai.com"
        target="_blank"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />

      <UButton
        label="Open UnmarkedAI"
        color="neutral"
        variant="subtle"
        to="https://unmarkedai.com"
        target="_blank"
        block
      />
    </template>
  </UHeader>
</template>
