import { Router } from 'express';
import { saveChat, getChatHistory } from '../controllers/chat.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);

router.post('/save', saveChat);
router.get('/history/:sessionId', getChatHistory);

export default router;
