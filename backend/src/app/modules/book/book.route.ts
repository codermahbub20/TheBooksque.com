import express from 'express';
import { BookControllers } from './book.controler';

const router = express.Router();

router.post('/products', BookControllers.createProducts);

router.get('/products', BookControllers.getAllProducts);

router.get('/products/:productId', BookControllers.getSingleProducts);

router.put('/products/:productId', BookControllers.getUpdatedProduct);

router.delete('/products/:productId', BookControllers.deleteSingleProducts);

export const BookRoutes = router;
