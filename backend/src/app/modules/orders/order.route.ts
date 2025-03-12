import express from 'express';
import { orderController } from './order.controler';

const router = express.Router();

router.get('/verify', orderController.verifyPayment);

router
  .route('/')
  .post(orderController.createOrder)
  .get(orderController.getOrders);

export const OrderRoutes = router;
