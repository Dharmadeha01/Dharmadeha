import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
    defineField({ name: 'footerTagline', title: 'Footer Tagline', type: 'string' }),
    defineField({ name: 'joinButtonText', title: 'Join Button Text', type: 'string' }),
    defineField({ name: 'mentorButtonText', title: 'Mentor Button Text', type: 'string' }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'telegramUrl', title: 'Telegram URL', type: 'url' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube URL', type: 'url' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
  ],
  preview: { select: { title: 'siteName' } },
})
