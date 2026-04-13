<script setup lang="ts">
const route = useRoute()
const { resolveCanonical, siteName } = useSite()

const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param[0] : param
})

const contentPath = computed(() => `/${slug.value}`)

const { data: post } = await useAsyncData(`post-${slug.value}`, () => queryCollection('posts').path(contentPath.value).first())

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`surround-${slug.value}`, () => queryCollectionItemSurroundings('posts', contentPath.value, {
  fields: ['description', 'title']
}))

const title = computed(() => post.value?.seo?.title || post.value?.title || siteName)
const description = computed(() => post.value?.seo?.description || post.value?.description || '')
const canonical = computed(() => resolveCanonical(route.path))
const published = computed(() => new Date(post.value?.date || Date.now()).toISOString())

useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'article',
  ogUrl: canonical,
  articlePublishedTime: published,
  twitterTitle: title,
  twitterDescription: description
})

useHead({
  link: [
    { rel: 'canonical', href: canonical }
  ],
  script: [
    {
      key: 'post-jsonld',
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title.value,
        description: description.value,
        datePublished: published.value,
        mainEntityOfPage: canonical.value,
        author: post.value?.authors?.map(author => ({
          '@type': 'Person',
          name: author.name,
          url: author.to
        }))
      })
    }
  ]
})

defineOgImageComponent('Saas', {
  title: title.value,
  description: description.value
})
</script>

<template>
  <div v-if="post">
    <AppHeader />

    <UMain>
      <UContainer class="py-10 sm:py-14">
        <UPageHeader
          :title="post.title"
          :description="post.description"
          class="mb-8"
        >
          <template #headline>
            <div class="flex flex-wrap items-center gap-3 text-sm">
              <UBadge
                v-if="post.badge"
                v-bind="post.badge"
                variant="subtle"
              />
              <time class="text-muted">
                {{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) }}
              </time>
            </div>
          </template>

          <div
            v-if="post.authors?.length"
            class="mt-4 flex flex-wrap items-center gap-3"
          >
            <UButton
              v-for="author in post.authors"
              :key="author.to"
              :to="author.to"
              color="neutral"
              variant="subtle"
              target="_blank"
              size="sm"
            >
              <UAvatar
                v-bind="author.avatar"
                alt="Author avatar"
                size="2xs"
              />

              {{ author.name }}
            </UButton>
          </div>
        </UPageHeader>

        <UPage>
          <UPageBody>
            <article class="prose prose-slate dark:prose-invert">
              <ContentRenderer :value="post" />
            </article>

            <USeparator v-if="surround?.length" class="my-10" />

            <UContentSurround
              v-if="surround?.length"
              :surround="surround"
            />
          </UPageBody>

          <template
            v-if="post.body?.toc?.links?.length"
            #right
          >
            <div class="sticky top-24">
              <UContentToc :links="post.body.toc.links" />
            </div>
          </template>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
