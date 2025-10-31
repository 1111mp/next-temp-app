import { z } from '@/lib/zod';

export const PostCreateOneInput = z.object({
  name: z.string().min(1, 'Invalid name'),
  description: z.string().min(1, 'Invalid description'),
});
