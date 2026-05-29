import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
    defineField({ name: 'footerTagline', title: 'Footer Tagline (EN)', type: 'string' }),
    defineField({ name: 'joinButtonText', title: 'Join Button Text (EN)', type: 'string' }),
    defineField({ name: 'mentorButtonText', title: 'Mentor Button Text (EN)', type: 'string' }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'telegramUrl', title: 'Telegram URL', type: 'url' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube URL', type: 'url' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'joinButtonTextRu', title: '🇷🇺 Join Button (RU)', type: 'string' }),
    defineField({ name: 'joinButtonTextUa', title: '🇺🇦 Join Button (UA)', type: 'string' }),
    defineField({ name: 'mentorButtonTextRu', title: '🇷🇺 Mentor Button (RU)', type: 'string' }),
    defineField({ name: 'mentorButtonTextUa', title: '🇺🇦 Mentor Button (UA)', type: 'string' }),
    defineField({ name: 'footerTaglineRu', title: '🇷🇺 Footer Tagline (RU)', type: 'string' }),
    defineField({ name: 'footerTaglineUa', title: '🇺🇦 Footer Tagline (UA)', type: 'string' }),
  ],
  preview: { select: { title: 'siteName' } },
})
