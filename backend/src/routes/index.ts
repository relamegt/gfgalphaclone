import { Router } from 'express';

import healthRoutes from './healthRoutes';

const router: Router = Router();

router.use('/', healthRoutes);

export default router;
