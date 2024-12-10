import type { CollectionConfig } from 'payload'

export const ContentBlock: CollectionConfig = {
  slug: 'content-blocks',
  labels: {
    singular: 'Content Block',
    plural: 'Content Blocks',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Manage content blocks with customizable details and lists.',
    group: 'CMS',
  },
  fields: [
    {
      name: 'blockType',
      label: 'Block Type',
      type: 'select',
      options: [
        { label: 'Basic Block', value: 'basic' },
        { label: 'List Block', value: 'list' },
        { label: 'Category List', value: 'categoryBlock' },
        { label: 'Post List', value: 'post' },
        { label: 'Testimonial List', value: 'testimonial' },
      ],
      required: true,
      defaultValue: 'basic',
      admin: {
        description: 'Select the type of block.',
      },
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      admin: {
        description: 'The title of the content block.',
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      required: true,
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
      name: 'customAttributes',
      label: 'Custom Attributes',
      type: 'array',
      fields: [
        {
          name: 'key',
          label: 'Key',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          label: 'Value',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Add custom key-value attributes for this content block.',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      admin: {
        description: 'Provide a detailed description for the content block.',
      },
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload an image for this block.',
      },
    },
    {
      name: 'file',
      label: 'File',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload a file (e.g., PDF, video, or image).',
      },
    },
    {
      name: 'listItems',
      label: 'List of Items',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
        {
          name: 'slug',
          label: 'Slug',
          type: 'text',
          //   hooks: {
          //     beforeValidate: [
          //       ({ data }) => {
          //         if (data && !data.slug && data.title) {
          //           return {
          //             ...data,
          //             slug: data.title
          //               .toLowerCase()
          //               .replace(/[^a-z0-9]+/g, '-')
          //               .replace(/^-+|-+$/g, ''),
          //           }
          //         }
          //         return data
          //       },
          //     ],
          //   },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'richText',
        },
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
      admin: {
        condition: (data) => data.blockType === 'list',
      },
    },
    {
      name: 'categoryBlock',
      label: 'Category List',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        condition: (data) => data.blockType === 'categoryBlock',
      },
    },
  ],
}
