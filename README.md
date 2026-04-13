# UnmarkedAI Blog

This repository is the dedicated Nuxt child application for `https://unmarkedai.com/blog`.

## What this app does

- Serves the UnmarkedAI blog index at `/blog`
- Serves blog posts at `/blog/:slug`
- Ships as a child microfrontend behind the main `unmarkedai.com` default app

## Environment

Set these in Vercel for the child app:

```bash
NUXT_PUBLIC_SITE_URL=https://unmarkedai.com/blog
NUXT_APP_BASE_URL=/blog/
```

## Local development

```bash
npm.cmd run dev
npm.cmd run typecheck
npm.cmd run build
```

## Default app microfrontends config

This child repo should not own a deployed `microfrontends.json`. Add the routing in the main/default app instead:

```json
{
  "$schema": "https://openapi.vercel.sh/microfrontends.json",
  "applications": {
    "main-app": {},
    "unmarkedai-blog": {
      "development": {
        "fallback": "your-child-blog-production-url.vercel.app"
      },
      "routing": [
        {
          "paths": ["/blog/:path*"]
        }
      ]
    }
  }
}
```
