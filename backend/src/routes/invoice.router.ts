import { Router } from 'express';
import invoiceController from '../controllers/invoice.controller';

const router = Router();

router.post('/', invoiceController.createInvoice);
router.get('/', invoiceController.getAllInvoices);
router.get('/:id', invoiceController.getInvoice);
router.put('/:id/status', invoiceController.updateInvoiceStatus);
router.delete('/:id', invoiceController.deleteInvoice);

export default router;