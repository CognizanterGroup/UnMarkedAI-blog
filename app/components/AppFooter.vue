<script setup lang="ts">
const links = [{
  label: 'Main site',
  to: 'https://unmarkedai.com'
}, {
  label: 'All posts',
  to: '/'
}]
</script>

<template>
  <USeparator class="h-px" />

  <footer class="border-t border-default/60">
    <UContainer class="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="font-medium text-highlighted">
          UnmarkedAI Blog
        </p>
        <p class="text-sm text-muted">
          Practical writing on AI integrity, product trust, and responsible deployment.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <UButton
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          color="neutral"
          variant="ghost"
          :target="link.to.startsWith('http') ? '_blank' : undefined"
        >
          {{ link.label }}
        </UButton>
      </div>
    </UContainer>
  </footer>
</template>
