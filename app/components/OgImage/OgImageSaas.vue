<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex h-full w-full flex-col justify-between bg-slate-950 px-16 py-14 text-slate-50">
    <div class="flex items-center gap-4 text-3xl font-semibold tracking-tight">
      <div class="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-slate-950">
        U
      </div>
      <div class="flex items-center gap-3">
        <span>UnmarkedAI</span>
        <span class="text-slate-400">Blog</span>
      </div>
    </div>

    <div class="max-w-5xl">
      <h1 class="mb-6 text-7xl font-semibold leading-tight">
        {{ title }}
      </h1>
      <p class="max-w-4xl text-4xl leading-tight text-slate-300">
        {{ description }}
      </p>
    </div>

    <div class="flex items-center justify-between text-2xl text-slate-400">
      <span>AI integrity, product trust, and practical systems</span>
      <span>unmarkedai.com/blog</span>
    </div>
  </div>
</template>
