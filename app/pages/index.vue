<script setup lang="ts">
const route = useRoute()
const { resolveCanonical, siteDescription, siteName } = useSite()

const { data: page } = await useAsyncData('blog', () => queryCollection('blog').first())
const { data: posts } = await useAsyncData('blog-posts', () => queryCollection('posts').order('date', 'DESC').all())

const title = computed(() => page.value?.seo?.title || page.value?.title || siteName)
const description = computed(() => page.value?.seo?.description || page.value?.description || siteDescription)
const canonical = computed(() => resolveCanonical(route.path))

useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: canonical,
  twitterTitle: title,
  twitterDescription: description
})

useHead({
  link: [
    { rel: 'canonical', href: canonical }
  ],
  script: [
    {
      key: 'blog-jsonld',
      type: 'application/ld+json',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: siteName,
        description: description.value,
        url: canonical.value
      })
    }
  ]
})
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer class="py-10 sm:py-14">
        <div class="mb-12 max-w-3xl">
          <UBadge
            label="Official blog"
            variant="subtle"
            class="mb-4"
          />
          <h1 class="text-4xl font-semibold tracking-tight text-highlighted sm:text-5xl">
            {{ page?.title || siteName }}
          </h1>
          <p class="mt-4 text-lg leading-8 text-muted">
            {{ description }}
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <UButton
              to="https://unmarkedai.com"
              target="_blank"
              trailing-icon="i-lucide-arrow-up-right"
            >
              Visit main product
            </UButton>
            <UButton
              to="#latest-posts"
              color="neutral"
              variant="outline"
            >
              Read latest posts
            </UButton>
          </div>
        </div>

        <section
          id="latest-posts"
          class="space-y-6"
        >
          <div class="flex items-end justify-between gap-4">
            <div>
              <p class="text-sm font-medium uppercase tracking-[0.24em] text-primary">
                Latest posts
              </p>
              <h2 class="mt-2 text-2xl font-semibold text-highlighted">
                Notes from the UnmarkedAI team
              </h2>
            </div>
            <p class="text-sm text-muted">
              {{ posts?.length || 0 }} published articles
            </p>
          </div>

          <UBlogPosts>
            <UBlogPost
              v-for="(post, index) in posts"
              :key="post.path"
              :to="post.path"
              :title="post.title"
              :description="post.description"
              :image="post.image"
              :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
              :authors="post.authors"
              :badge="post.badge"
              :orientation="index === 0 ? 'horizontal' : 'vertical'"
              :class="[index === 0 && 'col-span-full']"
              variant="naked"
              :ui="{
                description: 'line-clamp-3'
              }"
            />
          </UBlogPosts>
        </section>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
