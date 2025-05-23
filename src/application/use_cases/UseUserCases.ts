import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { hashPassword, comparePassword } from '../../shared/utils/hash';
import { generateToken } from '../../shared/utils/jwt';

export class UserUseCases {
  constructor(private userRepository: IUserRepository) {}

  async register(name: string, email: string, password: string) {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new Error('User already exists');

    const hashed = await hashPassword(password);  // 🔸 Hasheia a senha
    const user = new User(name, email, hashed);
    return await this.userRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    return generateToken({ email: user.email });  // 🔸 Gera token
  }

  async getAll() {
    return await this.userRepository.findAll();
  }

  async getById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async update(id: string, data: Partial<User>) {
    return await this.userRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
