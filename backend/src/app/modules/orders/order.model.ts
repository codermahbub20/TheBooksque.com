import mongoose, { model, Schema } from 'mongoose';
import { Order } from './order.interface';
import { BookModel } from '../book/book.model';
import { NextFunction } from 'express';

const orderSchema = new Schema<Order>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      'Please provide a valid email address',
    ],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'Product reference is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price must be non-negative'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to validate product quantity and calculate total price
orderSchema.pre('validate', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const order = this;
  try {
    const product = await BookModel.findById(order.product);
    if (!product) {
      throw new Error('Product not found');
    }

    if (product.quantity < order.quantity) {
      throw new Error(
        `Insufficient product quantity. Available: ${product.quantity}, Requested: ${order.quantity}`,
      );
    }
    // Calculate total price based on product price
    order.totalPrice = product.price * order.quantity;
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const formattedError = {
      message: 'Failed to Order creation ',
      success: false,
      error: error.message,
      stack: error.stack,
    };
    next(new Error(JSON.stringify(formattedError)));
  }
});

// Post-save hook to update product stock
// eslint-disable-next-line @typescript-eslint/no-explicit-any
orderSchema.post('save', async function (doc: any, next: NextFunction) {
  try {
    const product = await BookModel.findById(doc.product);
    if (product) {
      product.quantity -= doc.quantity;
      await product.save();
    }
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
});

export const OrderModel = model<Order>('Order', orderSchema);
