import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { v4 as uuidv4 } from 'uuid';

interface UserRecord extends User {
  id: string;
}

export class UserRepository implements IUserRepository {
  private users: UserRecord[] = [];

  async save(user: User): Promise<User> {
    const newUser = { ...user, id: uuidv4() };   // ✅ Adiciona id
    this.users.push(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) throw new Error('User not found');
    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
  }
}
