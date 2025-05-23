import { z } from 'zod';

export const userRegisterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export type CreateUserInput = z.infer<typeof userRegisterSchema>;

export const userParamsSchema = z.object({
  id: z.string().uuid('Invalid user ID'),
});
