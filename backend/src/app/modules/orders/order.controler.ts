import CatchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderService } from './order.services';

const createOrder = CatchAsync(async (req, res) => {
  const user = req.user;

  const order = await orderService.createOrder(user, req.body, req.ip!);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order placed successfully',
    data: order,
  });
});

const getOrders = CatchAsync(async (req, res) => {
  const order = await orderService.getOrders();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order retrieved successfully',
    data: order,
  });
});

const verifyPayment = CatchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order verified successfully',
    data: order,
  });
});

export const orderController = { createOrder, verifyPayment, getOrders };
