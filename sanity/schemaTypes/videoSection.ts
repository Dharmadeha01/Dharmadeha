import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'videoSection',
  title: 'Video Section',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'headlineItalic', title: 'Headline Italic Part', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text', type: 'string' }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Just the ID part from the YouTube URL. Example: for youtube.com/watch?v=5BcRI87s8q4 enter: 5BcRI87s8q4',
    }),
  ],
  preview: { select: { title: 'headline' } },
})
