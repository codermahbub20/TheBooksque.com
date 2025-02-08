import { Book } from '../book/book.interface';

export type Order = {
  email: string;
  product: Book | string;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
};
