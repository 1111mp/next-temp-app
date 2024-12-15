import { z } from 'zod';

const regex =
  /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{8,16}$/;

export const LoginInput = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().regex(regex, 'Invalid password'),
  remember: z.boolean().default(false),
});

export const SignUpInput = z.object({
  name: z.string().min(5, 'Invalid name'),
  email: z.string().email('Invalid email'),
  password: z.string().regex(regex, 'Invalid password'),
  remember: z.boolean().default(false),
});

export const MailerInput = z.object({
  email: z
    .string({
      invalid_type_error: 'Invalid email',
      required_error: 'Invalid email',
    })
    .email('Invalid email'),
  remember: z.boolean().default(false),
});
