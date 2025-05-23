import { RequestHandler } from 'express';
import { UserUseCases } from '../../../application/use_cases/UseUserCases';
import { UserRepository } from '../../../infrastructure/database/UserRepository';

const userRepo = new UserRepository();
const userUseCases = new UserUseCases(userRepo);

export const register: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userUseCases.register(name, email, password);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await userUseCases.login(email, password);
    res.json({ token });
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};

export const getAll: RequestHandler = async (_req, res) => {
  const users = await userUseCases.getAll();
  res.json(users);
};

export const getById: RequestHandler = async (req, res) => {
  try {
    const user = await userUseCases.getById(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: (e as Error).message });
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const user = await userUseCases.update(req.params.id, req.body);
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};

export const remove: RequestHandler = async (req, res) => {
  try {
    await userUseCases.delete(req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};
