import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available for Work?',
      type: 'boolean',
      description: 'Toggle to show/hide the "Available for Work" badge on homepage',
      initialValue: true,
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
    }),
    defineField({
      name: 'bio',
      title: 'Bio / About Me',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Your personal bio for the About Me section',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
       fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
     defineField({
      name: 'resume',
      title: 'Resume',
      type: 'file',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number (e.g. 628123456789)',
      type: 'string',
    }),
  ],
})
