import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
