import mongoose from 'mongoose';
import {
  PendingOTPSchema,
  CoinSchema, NotificationSchema, TransactionSchema, WalletSchema, UserSettingsSchema, UserSchema
} from './schemata';

export const UserModel = mongoose.model('User', UserSchema);

export const NotificationModel = mongoose.model('Notification', NotificationSchema);

export const TransactionModel = mongoose.model('Transaction', TransactionSchema);

export const CoinModel = mongoose.model('Coin', CoinSchema);

export const WalletModel = mongoose.model('Wallet', WalletSchema);

export const PendingOTPModel = mongoose.model('PendingOTP', PendingOTPSchema);

export const UserSettingsModel = mongoose.model('UserSetting', UserSettingsSchema);