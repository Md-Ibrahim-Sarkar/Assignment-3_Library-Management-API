import express, { Application, Request, Response } from 'express';
import { bookRoutes } from './app/controllers/book.controller';
import { borrowRoute } from './app/controllers/borrow.controller';


const app: Application = express();

app.use(express.json());


app.use('/api/books', bookRoutes)
app.use('/api/borrow', borrowRoute);





app.get('/', (req: Request, res: Response) => {
  res.send(
    'Welcome to Library Management API with Express, Mongoose, TypeScript & MongoDB'
  );
});



export default app;