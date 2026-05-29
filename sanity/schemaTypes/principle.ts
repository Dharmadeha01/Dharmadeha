import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'principle',
  title: 'Our Principles',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title (EN)', type: 'string' }),
    defineField({ name: 'body', title: 'Body (EN)', type: 'text' }),
    defineField({ name: 'titleRu', title: 'Title (RU)', type: 'string' }),
    defineField({ name: 'bodyRu', title: 'Body (RU)', type: 'text' }),
    defineField({ name: 'titleUa', title: 'Title (UA)', type: 'string' }),
    defineField({ name: 'bodyUa', title: 'Body (UA)', type: 'text' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: { select: { title: 'title' } },
})
