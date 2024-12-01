import { Router } from 'express';
import { createOrder, getAllOrders, calculateRevenue } from '../controllers/orderController';

const router = Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/revenue', calculateRevenue);

export default router;
