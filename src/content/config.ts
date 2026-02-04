import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().or(z.date()).transform((val) => (val instanceof Date ? val : new Date(val))),
    updatedDate: z.string().or(z.date()).transform((val) => (val instanceof Date ? val : new Date(val))).optional(),
    author: z.string().default('datashake'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
