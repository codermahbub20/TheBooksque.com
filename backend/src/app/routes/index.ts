import express from 'express';
import { authRoutes } from '../modules/Auth/auth.route';
import { userRoutes } from '../modules/User/user.route';
import { OrderRoutes } from '../modules/orders/order.route';
import { BookRoutes } from '../modules/book/book.route';

const router = express.Router();

type Route = {
  path: string;
  route: express.Router;
};

const routes: Route[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/',
    route: BookRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  //   {
  //     path: '/payment',
  //     route: PaymentRoutes,
  //   },
  {
    path: '/users',
    route: userRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
