import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import router from './app/routes';
const app: Application = express();

// parsers use
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

//  application routes
app.use('/api/v1', router);
// // Order routes
// app.use('/api', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
