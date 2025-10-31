import { z } from '@/lib/zod';

const regex =
  /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{8,16}$/;

export const UserLoginInput = z.object({
  email: z.email('Invalid email'),
  password: z.string().regex(regex, 'Invalid password'),
  remember: z.boolean().default(false).optional(),
});

export const UserCreateOneInput = z.object({
  name: z.string().min(5, 'Invalid name'),
  email: z.email('Invalid email'),
  password: z.string().regex(regex, 'Invalid password'),
  remember: z.boolean().default(false).optional(),
});

export const UserLoginByEmailInput = z.object({
  email: z.email('Invalid email'),
  remember: z.boolean().default(false),
});

export const UserLoginBySealInput = z.object({
  seal: z.string(),
});
