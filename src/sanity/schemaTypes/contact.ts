import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Messages',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sentAt',
      title: 'Sent At (WIB)',
      type: 'string', // Kita simpan sebagai String agar formatnya persis WIB
      description: 'Waktu pengiriman dalam Zona Waktu Indonesia Barat',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Read', value: 'read' },
          { title: 'Replied', value: 'replied' },
        ],
      },
      initialValue: 'new',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'sentAt', // Preview menampilkan waktu WIB
    },
  },
})