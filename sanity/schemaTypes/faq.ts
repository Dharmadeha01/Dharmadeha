import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question (EN)', type: 'string' }),
    defineField({ name: 'answer', title: 'Answer (EN)', type: 'text' }),
    defineField({ name: 'questionRu', title: 'Question (RU)', type: 'string' }),
    defineField({ name: 'answerRu', title: 'Answer (RU)', type: 'text' }),
    defineField({ name: 'questionUa', title: 'Question (UA)', type: 'string' }),
    defineField({ name: 'answerUa', title: 'Answer (UA)', type: 'text' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: { select: { title: 'question' } },
})
