import { Router } from 'express';
import menuController from '../controllers/menu.controller';

const router = Router();

router.get('/', menuController.getActiveProducts);

router.get('/all', menuController.getAllProducts);

router.get('/:id', menuController.getProductById);

router.post('/', menuController.createProduct);

router.put('/:id', menuController.updateProduct);

router.delete('/:id', menuController.deleteProduct);

router.put('/:id/deactivate', menuController.deactivateProduct);

export default router;