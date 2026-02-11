import { defineCollection, z } from 'astro:content';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.any().transform((val) => String(val)),
  updatedDate: z.any().transform((val) => String(val)).optional(),
  author: z.string().default('datashake'),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  draft: z.boolean().default(false),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
});

const blog = defineCollection({ type: 'content', schema: blogSchema });
const blogEn = defineCollection({ type: 'content', schema: blogSchema });

export const collections = { blog, 'blog-en': blogEn };
