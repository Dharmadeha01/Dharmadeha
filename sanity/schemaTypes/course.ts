import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'course',
  title: 'Courses',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Course Title', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['active', 'coming-soon'] },
    }),
    defineField({ name: 'lessons', title: 'Number of Lessons', type: 'number' }),
    defineField({ name: 'duration', title: 'Duration', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'cover', title: 'Cover Image', type: 'image' }),
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
          { name: 'number', title: 'Lesson number', type: 'number' },
          { name: 'title', title: 'Lesson title', type: 'string' },
          { name: 'topic', title: 'Topic', type: 'string' },
        ],
      }],
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
