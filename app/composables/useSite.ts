const DEFAULT_SITE_URL = 'https://unmarkedai.com/blog'
const SITE_NAME = 'UnmarkedAI Blog'
const SITE_DESCRIPTION = 'AI integrity, product trust, and practical systems for teams building with generative AI.'

export function useSite() {
  const config = useRuntimeConfig()

  const siteUrl = computed(() => String(config.public.siteUrl || DEFAULT_SITE_URL).replace(/\/+$/, ''))
  const baseUrl = computed(() => config.app.baseURL || '/')

  function resolveCanonical(path = '/') {
    if (!path || path === '/') {
      return siteUrl.value
    }

    return `${siteUrl.value}${path.replace(/\/+$/, '')}`
  }

  function withBaseAsset(path: string) {
    const normalizedBase = baseUrl.value === '/' ? '' : baseUrl.value.replace(/\/$/, '')
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    return `${normalizedBase}${normalizedPath}`
  }

  return {
    baseUrl,
    siteDescription: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    siteUrl,
    resolveCanonical,
    withBaseAsset
  }
}
