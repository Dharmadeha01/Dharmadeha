import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'course',
  title: 'Courses',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Course Title (EN)', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'tagline', title: 'Tagline (EN)', type: 'string' }),
    defineField({ name: 'description', title: 'Description (EN)', type: 'text' }),
    defineField({ name: 'titleRu', title: 'Course Title (RU)', type: 'string' }),
    defineField({ name: 'taglineRu', title: 'Tagline (RU)', type: 'string' }),
    defineField({ name: 'descriptionRu', title: 'Description (RU)', type: 'text' }),
    defineField({ name: 'titleUa', title: 'Course Title (UA)', type: 'string' }),
    defineField({ name: 'taglineUa', title: 'Tagline (UA)', type: 'string' }),
    defineField({ name: 'descriptionUa', title: 'Description (UA)', type: 'text' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Coming Soon', value: 'coming-soon' },
        ],
      },
    }),
    defineField({ name: 'lessons', title: 'Number of Lessons', type: 'number' }),
    defineField({ name: 'duration', title: 'Duration (e.g. ~3 months)', type: 'string' }),
    defineField({ name: 'cover', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'authorName', title: 'Author Name', type: 'string' }),
    defineField({ name: 'authorRole', title: 'Author Role', type: 'string' }),
    defineField({
      name: 'whoFor',
      title: 'Who it is for (EN)',
      type: 'array',
      of: [{
        type: 'object',
        name: 'whoForItem',
        title: 'Item',
        fields: [
          defineField({ name: 'text', title: 'Description', type: 'string' }),
        ],
        preview: { select: { title: 'text' } },
      }],
    }),
    defineField({
      name: 'curriculum',
      title: 'Curriculum (EN)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'lesson',
          title: 'Lesson',
          fields: [
            defineField({
              name: 'number',
              title: 'Lesson Number',
              type: 'number',
              validation: Rule => Rule.required().min(1),
            }),
            defineField({
              name: 'title',
              title: 'Lesson Title',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'topic',
              title: 'Topic / Short description',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'topic', number: 'number' },
            prepare({ title, subtitle, number }: { title?: string; subtitle?: string; number?: number }) {
              return { title: `${number ?? '?'}. ${title ?? ''}`, subtitle }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'whoForRu',
      title: '🇷🇺 Who it is for (RU)',
      type: 'array',
      of: [{ type: 'object', name: 'whoForItemRu', fields: [defineField({ name: 'text', title: 'Text', type: 'string' })], preview: { select: { title: 'text' } } }]
    }),
    defineField({
      name: 'whoForUa',
      title: '🇺🇦 Who it is for (UA)',
      type: 'array',
      of: [{ type: 'object', name: 'whoForItemUa', fields: [defineField({ name: 'text', title: 'Text', type: 'string' })], preview: { select: { title: 'text' } } }]
    }),
    defineField({
      name: 'curriculumRu',
      title: '🇷🇺 Curriculum (RU)',
      type: 'array',
      of: [{
        type: 'object',
        name: 'lessonRu',
        fields: [
          defineField({ name: 'number', title: 'Lesson Number', type: 'number' }),
          defineField({ name: 'title', title: 'Lesson Title (RU)', type: 'string' }),
          defineField({ name: 'topic', title: 'Topic (RU)', type: 'string' }),
        ],
        preview: { select: { title: 'title', subtitle: 'topic', number: 'number' }, prepare({ title, subtitle, number }: { title?: string; subtitle?: string; number?: number }) { return { title: `${number ?? '?'}. ${title ?? ''}`, subtitle } } }
      }]
    }),
    defineField({
      name: 'curriculumUa',
      title: '🇺🇦 Curriculum (UA)',
      type: 'array',
      of: [{
        type: 'object',
        name: 'lessonUa',
        fields: [
          defineField({ name: 'number', title: 'Lesson Number', type: 'number' }),
          defineField({ name: 'title', title: 'Lesson Title (UA)', type: 'string' }),
          defineField({ name: 'topic', title: 'Topic (UA)', type: 'string' }),
        ],
        preview: { select: { title: 'title', subtitle: 'topic', number: 'number' }, prepare({ title, subtitle, number }: { title?: string; subtitle?: string; number?: number }) { return { title: `${number ?? '?'}. ${title ?? ''}`, subtitle } } }
      }]
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'status', media: 'cover' } },
})
