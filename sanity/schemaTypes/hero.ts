import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({ name: 'headlineLine1', title: 'Headline Line 1', type: 'string' }),
    defineField({ name: 'headlineLine2', title: 'Headline Line 2 (italic)', type: 'string' }),
    defineField({ name: 'bodyText', title: 'Body Text', type: 'text' }),
    defineField({ name: 'primaryButtonText', title: 'Primary Button Text', type: 'string' }),
    defineField({ name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string' }),
  ],
})
