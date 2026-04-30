import { Router } from 'express';
import { lookupVoter, getBoothLocation, registerInterest } from '../controllers/voter.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/lookup/:voterId', verifyToken, lookupVoter);
router.get('/booth-location/:boothNumber', getBoothLocation); // Can be public for mapping
router.post('/register-interest', registerInterest);

export default router;
