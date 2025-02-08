import { NextFunction, Request, Response } from 'express';
import { OrderServices } from './order.services';

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  try {
    // received response data from clients
    const order = req.body;
    // send the data in services function to save this data in mongodb
    const result = await OrderServices.createOrderInToDb(order);
    if (!result) {
      return res.status(404).json({
        message: 'Order not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
    next();
  } catch (error) {
    let errorResponse;
    if (error instanceof Error) {
      try {
        errorResponse = JSON.parse(error.message);
      } catch {
        errorResponse = {
          message: 'An unexpected error occurred.',
          success: false,
          error: error.message,
          stack: error.stack,
        };
      }
    }

    res.status(400).json(errorResponse);
  }
};

// Revenue
const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderServices.calculateTotalRevenueInToDb();
    res.status(200).json({
      message: 'Total revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to calculate total revenue',
      status: false,
      error: error.message,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getTotalRevenue,
};
