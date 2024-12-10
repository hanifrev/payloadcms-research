import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Manage customer testimonials here',
    group: 'CMS',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the person giving the testimonial',
      },
      validate: (val: any) => {
        if (!val || val.length < 2 || val.length > 50) {
          return 'Name must be between 2 and 50 characters'
        }
        return true
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      validate: (val: any) => {
        if (!val) {
          return 'Slug is required'
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
      admin: {
        description: 'Slug must have no spaces, use - instead',
      },
    },
    {
      name: 'testimonialText',
      label: 'Testimonial Text',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The main testimonial content',
      },
      validate: (val: any) => {
        if (!val || val.length < 10 || val.length > 500) {
          return 'Testimonial Text must be between 10 and 500 characters'
        }
        return true
      },
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Photo of the person giving the testimonial',
      },
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'number',
      admin: {
        description: 'Rating out of 5 (optional)',
      },
      validate: (val: any) => {
        if (val && (val < 1 || val > 5)) {
          return 'Rating must be between 1 and 5'
        }
        return true
      },
    },
    {
      name: 'dateTime',
      label: 'Date Time',
      type: 'date',
      required: true,
      admin: {
        description: 'Date and time when the testimonial was given',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
      hooks: {
        //   beforeValidate: [
        //     ({ value }) => {
        //       if (!value) {
        //         return new Date().toISOString();
        //       }
        //       return value;
        //     },
        //   ],
      },
    },
    {
      name: 'product',
      label: 'Product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      admin: {
        description: 'Select the product this testimonial is related to',
      },
      validate: (val: any) => {
        if (!val) {
          return 'Product reference is required'
        }
        return true
      },
    },
  ],
}
