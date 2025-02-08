import express from 'express';
import { OrderControllers } from './order.controler';

const router = express.Router();

router.post('/orders', OrderControllers.createOrder);

router.get('/orders/revenue', OrderControllers.getTotalRevenue);

export const OrderRoutes = router;
