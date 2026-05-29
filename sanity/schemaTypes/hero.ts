import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({ name: 'headlineLine1', title: 'Headline Line 1 (EN)', type: 'string', description: 'First line of the main headline' }),
    defineField({ name: 'headlineLine2', title: 'Headline Line 2 — italic (EN)', type: 'string', description: 'Second line shown in italic ember color' }),
    defineField({ name: 'bodyText', title: 'Body Text (EN)', type: 'text', description: 'Paragraph below the headline' }),
    defineField({ name: 'primaryButtonText', title: 'Primary Button Text', type: 'string' }),
    defineField({ name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string' }),
    defineField({ name: 'headlineLine1Ru', title: 'Headline Line 1 (RU)', type: 'string' }),
    defineField({ name: 'headlineLine2Ru', title: 'Headline Line 2 — italic (RU)', type: 'string' }),
    defineField({ name: 'bodyTextRu', title: 'Body Text (RU)', type: 'text' }),
    defineField({ name: 'headlineLine1Ua', title: 'Headline Line 1 (UA)', type: 'string' }),
    defineField({ name: 'headlineLine2Ua', title: 'Headline Line 2 — italic (UA)', type: 'string' }),
    defineField({ name: 'bodyTextUa', title: 'Body Text (UA)', type: 'text' }),
    defineField({ name: 'primaryButtonTextRu', title: '🇷🇺 Primary Button (RU)', type: 'string' }),
    defineField({ name: 'primaryButtonTextUa', title: '🇺🇦 Primary Button (UA)', type: 'string' }),
  ],
  preview: { select: { title: 'headlineLine1' } },
})
