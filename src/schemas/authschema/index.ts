import { z } from 'zod';

export const schema = z.object({
  email: z.string().email('Incorrect email or password'),
  password: z.string().min(6, 'Incorrect email or password'),
});
