import { Router } from 'express';
import { show } from '../controllers/homeController';

const router = Router();

router.get('/', show);

export default router;