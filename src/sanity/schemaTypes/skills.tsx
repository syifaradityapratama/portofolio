import { defineField, defineType } from 'sanity'
import React from 'react'
/* eslint-disable @next/next/no-img-element */

export default defineType({
  name: 'skills',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      description: 'e.g., https://laravel.com - Used to auto-fetch logo',
    }),
    defineField({
      name: 'icon',
      title: 'Custom Logo (Optional)',
      type: 'image',
      description: 'Overrides the auto-fetched logo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Type any category name (e.g. Frontend, Backend, Database, Tools, Marketing, DevOps)',
      validation: (Rule) => Rule.required().error('Category is required'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'icon',
      url: 'websiteUrl'
    },
    prepare({ title, subtitle, media, url }) {
      let favicon = null
      if (url) {
        try { favicon = <img src={`https://www.google.com/s2/favicons?sz=128&domain=${new URL(url).hostname}`} alt={title} style={{ objectFit: 'contain' }} /> } catch { /* invalid URL */ }
      }
      return {
        title,
        subtitle,
        media: media || favicon
      }
    }
  }
})
