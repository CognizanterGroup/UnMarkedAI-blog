import { defineCollection, z } from '@nuxt/content'

const createImageSchema = () => z.object({
  src: z.string().nonempty().editor({ input: 'media' })
})

export const collections = {
  blog: defineCollection({
    source: '3.blog.yml',
    type: 'page'
  }),
  posts: defineCollection({
    source: {
      include: '3.blog/**/*.md',
      prefix: ''
    },
    type: 'page',
    schema: z.object({
      image: createImageSchema().optional(),
      authors: z.array(
        z.object({
          name: z.string().nonempty(),
          to: z.string().nonempty(),
          avatar: z.object({ src: z.string().nonempty().editor({ input: 'media' }) })
        })
      ),
      date: z.date(),
      badge: z.object({ label: z.string().nonempty() }).optional()
    })
  })
}
