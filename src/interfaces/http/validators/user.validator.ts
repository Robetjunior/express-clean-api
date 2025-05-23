import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  email: z.string().email('Invalid email format'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const userParamsSchema = z.object({
  id: z.string().uuid('Invalid user ID'),
});
