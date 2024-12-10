import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  admin: {
    useAsTitle: 'title',
    preview: (doc) =>
      doc?.slug ? `${process.env.PAYLOAD_PUBLIC_SITE_URL}/posts/${doc.slug}` : null,
    group: 'CMS',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      validate: (val: any) => {
        if (val.length > 96) {
          return 'Title must not exceed 96 characters'
        }
        return true
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
      validate: (val: any) => {
        if (!val) {
          return 'Slug is required to generate a URL'
        }
        if (/\s/.test(val)) {
          return 'Slug must not contain spaces. Use "-" instead of spaces.'
        }
        if (!/^[a-zA-Z0-9-]+$/.test(val)) {
          return 'Slug can only contain letters, numbers, and hyphens.'
        }
        return true
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            return value.trim().toLowerCase()
          },
        ],
      },
    },
    {
      name: 'publishedDate',
      label: 'Published Date',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      required: false,
      admin: {
        description: 'A short summary of the post (max 200 characters)',
      },
      validate: (val: any) => val?.length <= 200 || 'Excerpt must be 200 characters or less.',
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'array',
      labels: {
        singular: 'Tag',
        plural: 'Tags',
      },
      fields: [
        {
          name: 'tag',
          label: 'Tag',
          type: 'text',
        },
      ],
    },
  ],
}
