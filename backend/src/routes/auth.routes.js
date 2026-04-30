import { Router } from 'express';
import { verifyToken, setRole } from '../controllers/auth.controller.js';
import { verifyToken as authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/verify-token', authMiddleware, verifyToken);
router.post('/set-role', authMiddleware, setRole);

export default router;
