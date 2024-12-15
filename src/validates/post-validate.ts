import { z } from 'zod';

export const PostCreationInput = z.object({
  name: z.string().min(1, 'Invalid name'),
  description: z.string().min(1, 'Invalid description'),
});
