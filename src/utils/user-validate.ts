import { z } from "zod";

const regex =
  /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{8,16}$/;

export const SignInInput = z.object({
  email: z.string().email(),
  password: z.string().regex(regex, "Invalid password"),
  remember: z.boolean().default(false),
});

export const SignUpInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().regex(regex, "Invalid password"),
  remember: z.boolean().default(false),
});
