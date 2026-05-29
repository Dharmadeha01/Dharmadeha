import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Quote (EN)', type: 'text' }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'role', title: 'Role (EN)', type: 'string' }),
    defineField({ name: 'quoteRu', title: '🇷🇺 Quote (RU)', type: 'text' }),
    defineField({ name: 'quoteUa', title: '🇺🇦 Quote (UA)', type: 'text' }),
    defineField({ name: 'roleRu', title: '🇷🇺 Role (RU)', type: 'string' }),
    defineField({ name: 'roleUa', title: '🇺🇦 Role (UA)', type: 'string' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: { select: { title: 'name', subtitle: 'role' } },
})
