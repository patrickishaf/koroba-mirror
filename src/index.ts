import express, { Response } from 'express';
import cors from 'cors';
import authRouter from './auth/router';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import walletsRouter from './wallets/router';
import tradingRouter from './trading/router';
import notificationsRouter from './notifications/router';
import userSettingsRouter from './settings/router';
import txnsRouter from './transactions/router';
import priceAlertsRouter from './price_alerts/router';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}))

app.use('/trading', tradingRouter);
app.use('/notifications', notificationsRouter);
app.use('/auth', authRouter);
app.use('/wallets', walletsRouter);
app.use('/settings', userSettingsRouter);
app.use('/txns', txnsRouter);
app.use('/price_alerts', priceAlertsRouter);

app.get('/', (_, res: Response) => {
  res.send('debug welcome to home');
})

app.listen(3000, () => {
  mongoose.connect(process.env.DB_URL);
  console.log('server is listening on port 3000');
})