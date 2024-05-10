import { z } from 'zod';

export const schemaAuth = z.object({
  email: z.string().email('Incorrect email or password'),
  password: z.string().min(6, 'Incorrect email or password'),
});

export type AuthDTO = z.infer<typeof schemaAuth>;
