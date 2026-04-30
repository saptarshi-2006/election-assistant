import { Router } from 'express';
import { getDashboard, updateChecklist, getVoterList, verifyVoter } from '../controllers/blo.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

// All BLO routes require auth
router.use(verifyToken);

router.get('/dashboard', getDashboard);
router.patch('/checklist/:itemId', updateChecklist);
router.get('/voter-list', getVoterList);
router.patch('/verify-voter/:voterId', verifyVoter);

export default router;
