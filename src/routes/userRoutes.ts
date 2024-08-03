import { Router } from 'express';
import { register, login, me, updateRole } from '../controllers/userController';
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, me);
router.put('/:id/role', authMiddleware, updateRole);

export default router;