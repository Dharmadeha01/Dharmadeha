import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'principle',
  title: 'Our Principles',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: { select: { title: 'title' } },
})
