import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'course',
  title: 'Courses',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Course Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
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
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'cover', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'authorName', title: 'Author Name', type: 'string' }),
    defineField({ name: 'authorRole', title: 'Author Role', type: 'string' }),
    defineField({
      name: 'whoFor',
      title: 'Who it is for',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'curriculum',
      title: 'Curriculum',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'number', title: 'Lesson Number', type: 'number' }),
          defineField({ name: 'title', title: 'Lesson Title', type: 'string' }),
          defineField({ name: 'topic', title: 'Topic', type: 'string' }),
        ],
        preview: { select: { title: 'title', subtitle: 'topic' } },
      }],
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'status', media: 'cover' } },
})
