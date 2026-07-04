import { defineCollection, z } from 'astro:content';

const itmir = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string().optional().default(''),
    tags: z.array(z.string()).default([]),
    description: z.string().optional().default(''),
    draft: z.boolean().default(false),
    original_url: z.string().optional(),
  }),
});

const luminousky = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    project: z.string().optional(),
    description: z.string().optional().default(''),
    draft: z.boolean().default(false),
  }),
});

export const collections = { itmir, luminousky };
