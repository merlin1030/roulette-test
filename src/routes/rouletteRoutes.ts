import express from 'express';
import { create, show, spin, detele } from '../controllers/RouletteController';

const router = express.Router();

router.get('/', show);
router.post('/', create);
router.delete('/', detele);
router.post('/spin', spin);

export default router;