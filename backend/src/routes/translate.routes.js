import { Router } from 'express';
import { translateText } from '../controllers/translate.controller.js';

const router = Router();

// This might be public or require auth depending on requirements,
// but the specs didn't explicitly mandate auth for this, keeping it simple.
router.post('/', translateText);

export default router;
