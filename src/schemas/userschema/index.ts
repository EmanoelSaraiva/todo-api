import { z } from 'zod';

export const schemaUser = z
  .object({
    name: z.string().min(3, 'Minimum 3 characters'),
    email: z.string().email('Incorrect format email'),
    password: z.string().min(3, 'Minimum 6 characters'),
  })
  .required();

export type CreateUserDTO = z.infer<typeof schemaUser>;
