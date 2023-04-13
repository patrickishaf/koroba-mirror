import express, { Request, Response } from 'express';
import cors from 'cors';
import authRouter from './lib/auth/router';
import { connectToDb } from './db';

const app = express();

app.use(express.json());
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}))

app.get('/', (req: Request, res: Response) => {
  res.send('welcome to home');
})

app.use('/auth', authRouter);

app.listen(3000, async () => {
  await connectToDb();
  console.log('app is listening on port 3000');
})