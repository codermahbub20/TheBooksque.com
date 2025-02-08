import { Order } from './order.interface';
import { OrderModel } from './order.model';

const createOrderInToDb = async (order: Order) => {
  const result = await OrderModel.create(order);
  return result;
};

//  Calculate Total Revenue

const calculateTotalRevenueInToDb = async (): Promise<number> => {
  const result = await OrderModel.aggregate([
    {
      $lookup: {
        from: 'books',
        localField: 'product',
        foreignField: '_id',
        as: 'bookDetails',
      },
    },
    {
      $unwind: '$bookDetails',
    },
    {
      $addFields: {
        calculatedTotalPrice: {
          $multiply: ['$bookDetails.price', '$quantity'],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$calculatedTotalPrice' },
      },
    },
    {
      $project: {
        totalRevenue: 1,
      },
    },
  ]);

  return result[0]?.totalRevenue || 0;
};

export const OrderServices = {
  createOrderInToDb,
  calculateTotalRevenueInToDb,
};
