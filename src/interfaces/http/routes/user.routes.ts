import { Router } from 'express';
import { register, login, getAll, getById, update, remove } from '../controllers/UserController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { userRegisterSchema } from '../validators/user.validator';

const router = Router();

router.post('/register', validate({ body: userRegisterSchema }), register); 
router.post('/login', login);

router.use(authenticate);  // 🔸 Protege as rotas abaixo

router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
