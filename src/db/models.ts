import mongoose from 'mongoose';
import { coinSchema, notificationSchema, transactionSchema, userSchema, walletSchema } from './schemata';

export const UserModel = mongoose.model('User', userSchema);

export const NotificationModel = mongoose.model('Notification', notificationSchema);

export const TransactionModel = mongoose.model('Transaction', transactionSchema);

export const CoinModel = mongoose.model('Coin', coinSchema);

export const WalletModel = mongoose.model('Wallet', walletSchema);