import { getHealth, getStatus } from '@controllers/healthController';
import { Router } from 'express';

const router: Router = Router();

router.get('/health', getHealth);
router.get('/status', getStatus);

export default router;
