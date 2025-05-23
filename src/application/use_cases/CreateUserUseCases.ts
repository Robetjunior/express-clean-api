import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { z } from 'zod';

export const userRegisterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: any) {
    const validated = userRegisterSchema.parse(data);
    const user = new User(validated.name, validated.email, validated.password);  
    return await this.userRepository.save(user);
  }
}
