import { Router } from 'express';
import invoiceController from '../controllers/invoice.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', /* authenticate, */ invoiceController.createInvoice);
router.get('/', /* authenticate, */ invoiceController.getAllInvoices);
router.get('/:id', /* authenticate, */ invoiceController.getInvoice);
router.put('/:id/status', /* authenticate, */ invoiceController.updateInvoiceStatus);
router.delete('/:id', /* authenticate, */ invoiceController.deleteInvoice);

export default router;