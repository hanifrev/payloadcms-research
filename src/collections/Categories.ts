import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories', // The API route will be /api/categories
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  admin: {
    useAsTitle: 'name', // Use the 'name' field as the title in the admin UI
    description: 'Manage all categories here',
    group: 'Package Lists',
  },
  fields: [
    {
      name: 'name',
      label: 'Category Name',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Enter category name',
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text', // Payload doesn't have a specific slug type, but you can validate it.
      required: false,
      unique: true, // Ensures the slug is unique
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
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'parentCategory',
      label: 'Parent Category',
      type: 'relationship', // Relationships in Payload replace Sanity's references
      relationTo: 'categories', // Referencing the same collection
      admin: {
        description: 'Select the parent category if this is a subcategory',
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
          required: false,
        },
        {
          name: 'value',
          label: 'Value',
          type: 'text',
          required: false,
        },
      ],
      admin: {
        description: 'Define key-value pairs for custom attributes',
      },
    },
  ],
}
