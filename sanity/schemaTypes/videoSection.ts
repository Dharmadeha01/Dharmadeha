import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'videoSection',
  title: 'Video Section',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline (EN)', type: 'string' }),
    defineField({ name: 'headlineItalic', title: 'Headline Italic Part (EN)', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text (EN)', type: 'string' }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Just the ID part from the YouTube URL. Example: for youtube.com/watch?v=5BcRI87s8q4 enter: 5BcRI87s8q4',
    }),
    defineField({ name: 'headlineRu', title: '🇷🇺 Headline (RU)', type: 'string' }),
    defineField({ name: 'headlineUa', title: '🇺🇦 Headline (UA)', type: 'string' }),
    defineField({ name: 'headlineItalicRu', title: '🇷🇺 Headline Italic (RU)', type: 'string' }),
    defineField({ name: 'headlineItalicUa', title: '🇺🇦 Headline Italic (UA)', type: 'string' }),
    defineField({ name: 'bodyRu', title: '🇷🇺 Body (RU)', type: 'string' }),
    defineField({ name: 'bodyUa', title: '🇺🇦 Body (UA)', type: 'string' }),
  ],
  preview: { select: { title: 'headline' } },
})
