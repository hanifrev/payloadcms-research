import type { CollectionConfig } from 'payload'

export const Product: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Package Lists',
  },
  fields: [
    {
      name: 'productType',
      label: 'Product Type',
      type: 'select',
      options: [
        { label: 'Tour', value: 'tour' },
        { label: 'Transport', value: 'transport' },
        { label: 'Destination', value: 'destination' },
        { label: 'Ticket', value: 'ticket' },
      ],
      required: true,
    },
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
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
      name: 'categories',
      label: 'Categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      required: true,
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      admin: {
        condition: (data) => data.productType === 'tour',
      },
      validate: (val: any) => {
        // if (val == null) {
        //   return 'This field is required';
        // }
        if (typeof val !== 'number' || val <= 0) {
          return 'Value must be a positive number'
        }
        return true
      },
    },
    {
      name: 'customPrices',
      label: 'Custom Prices',
      type: 'array',
      fields: [
        { name: 'key', label: 'Key', type: 'text', required: true },
        { name: 'value', label: 'Value', type: 'text', required: true },
      ],
      admin: {
        condition: (data) => data.productType === 'tour',
      },
    },
    {
      name: 'departureDateRanges',
      label: 'Departure Date Ranges',
      type: 'array',
      fields: [
        { name: 'startDate', label: 'Start Date', type: 'date' },
        { name: 'endDate', label: 'End Date', type: 'date' },
      ],
      admin: {
        condition: (data) => data.productType === 'tour',
      },
    },
    {
      name: 'duration',
      label: 'Duration (Hours or Days)',
      type: 'text',
      required: true,
      admin: {
        condition: (data) => data.productType === 'tour',
      },
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
    {
      name: 'helpIcon',
      label: 'Help Icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => data.productType === 'destination',
      },
    },
    {
      name: 'bookingUrl',
      label: 'Booking URL',
      type: 'text',
      admin: {
        condition: (data) => data.productType === 'tour',
      },
    },
    {
      name: 'features',
      label: 'Features',
      type: 'array',
      fields: [
        { name: 'key', label: 'Key', type: 'text', required: true },
        { name: 'value', label: 'Value', type: 'text', required: true },
      ],
    },
    {
      name: 'destinationDetails',
      label: 'Destination Details',
      type: 'group',
      admin: {
        condition: (data) => data.productType === 'destination',
      },
      fields: [
        { name: 'areaName', label: 'Area Name', type: 'text' },
        { name: 'landArea', label: 'Land Area', type: 'text' },
        { name: 'travelDuration', label: 'Travel Duration', type: 'text' },
        { name: 'averageClimate', label: 'Average Climate', type: 'text' },
        { name: 'peakSeason', label: 'Peak Season', type: 'text' },
        { name: 'midSeason', label: 'Mid Season', type: 'text' },
        { name: 'monsoonSeason', label: 'Monsoon Season', type: 'text' },
        { name: 'travelGuide', label: 'Travel Guide', type: 'richText' },
      ],
    },
    {
      name: 'tourDetails',
      label: 'Tour Details',
      type: 'group',
      admin: {
        condition: (data) => data.productType === 'tour',
      },
      fields: [
        {
          name: 'tourSummary',
          label: 'Tour Summary',
          type: 'array',
          fields: [
            { name: 'isActive', label: 'Is Active', type: 'checkbox', defaultValue: true },
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'richText' },
            { name: 'image', label: 'Image', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'itinerary',
          label: 'Itinerary',
          type: 'array',
          fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'richText' },
            {
              name: 'images',
              label: 'Images',
              type: 'array',
              fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
            },
          ],
        },
        {
          name: 'transportation',
          label: 'Transportation',
          type: 'relationship',
          relationTo: 'categories',
        },
        {
          name: 'accommodation',
          label: 'Accommodation',
          type: 'richText',
        },
        {
          name: 'reviews',
          label: 'Reviews',
          type: 'array',
          fields: [{ name: 'review', type: 'relationship', relationTo: ['testimonials', 'posts'] }],
        },
        {
          name: 'thingsToNote',
          label: 'Things to Note',
          type: 'richText',
        },
      ],
    },
  ],
}
