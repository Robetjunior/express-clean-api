import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)  
});

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: any) {
    const validated = userSchema.parse(data);
    const user = new User(validated.name, validated.email, validated.password);  
    return await this.userRepository.save(user);
  }
}
