import { Router } from 'express';
import { create, getAll } from '../controllers/UserController';
import { validate } from '../middlewares/validate';
import { createUserSchema } from '../validators/user.validator';

const router = Router();

router.post('/', validate({ body: createUserSchema }), create);
router.get('/', getAll);

export default router;
