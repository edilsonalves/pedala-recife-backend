import { Router } from 'express';
import roadController from '../controllers/road.controller';

const router = Router();

router.get('/roads', roadController.index);
router.post('/roads', roadController.create);
router.put('/roads/:id', roadController.update);
router.delete('/roads/:id', roadController.destroy);

export default router;
