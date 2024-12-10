import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    group: 'CMS',
  },
  fields: [
    {
      name: 'pageType',
      label: 'Page Type',
      type: 'radio',
      options: [
        { label: 'Single', value: 'single' },
        { label: 'Multiple', value: 'multiple' },
      ],
      defaultValue: 'single',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      admin: {
        description: 'URL-friendly identifier',
      },
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      admin: {
        description: 'A detailed description of the page',
      },
    },
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'array',
      labels: {
        singular: 'Block',
        plural: 'Blocks',
      },
      fields: [
        {
          name: 'contentBlock',
          label: 'Content Block',
          type: 'relationship',
          relationTo: 'content-blocks',
        },
      ],
    },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          label: 'Meta Title',
          type: 'text',
          validate: (val: any) =>
            val && val.length > 60 ? 'SEO titles should be under 60 characters' : true,
        },
        {
          name: 'metaDescription',
          label: 'Meta Description',
          type: 'textarea',
          validate: (val: any) =>
            val && val.length > 160 ? 'SEO descriptions should be under 160 characters' : true,
        },
        {
          name: 'metaKeywords',
          label: 'Meta Keywords',
          type: 'array',
          labels: {
            singular: 'Keyword',
            plural: 'Keywords',
          },
          fields: [
            {
              name: 'keyword',
              label: 'Keyword',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'variants',
      label: 'Variants',
      type: 'array',
      labels: {
        singular: 'Variant',
        plural: 'Variants',
      },
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'relationship',
          relationTo: 'categories',
        },
      ],
      admin: {
        condition: (data) => data?.pageType === 'multiple',
      },
    },
  ],
}
