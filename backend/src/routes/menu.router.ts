import { Router } from 'express';
import menuController from '../controllers/menu.controller';

const router = Router();

router.get('/', menuController.getActiveProducts);

export default router;