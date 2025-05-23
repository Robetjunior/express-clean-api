import { RequestHandler } from 'express';
import { CreateUserUseCase } from '../../../application/use_cases/CreateUserUseCase';
import { UserRepository } from '../../../infrastructure/database/UserRepository';
import { CreateUserInput } from '../validators/user.validator';

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);

export const create: RequestHandler = async (req, res) => {
  const body = req.body as CreateUserInput;
  try {
    const user = await createUserUseCase.execute(body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAll: RequestHandler = async (_req, res) => {
  const users = await userRepository.findAll();
  res.json(users);
};
