import mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  message: String,
});

export const PriceAlertSchema = new mongoose.Schema({
  title: String,
  message: String,
  type: String,
  timestamp: Date
});

export const TransactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
});

export const CoinSchema = new mongoose.Schema({
  name: String,
  symbol: String,
});

export const WalletSchema = new mongoose.Schema({
  network: String,
  address: String,
  balance: Number,
});

export const PendingOTPSchema = new mongoose.Schema({
  email: String,
  otp: Number,
  password: String,
  isExpired: Boolean,
});

export const NotificationSettingsSchema = new mongoose.Schema({
  openTrade: {
    email: Boolean,
    sms: Boolean,
  },
  canceledTrade: {
    email: Boolean,
    sms: Boolean,
  },
  releaseTrade: {
    email: Boolean,
    sms: Boolean,
  },
  disputeTrade: {
    email: Boolean,
    sms: Boolean,
  },
  tradeStatus: {
    email: Boolean,
    sms: Boolean,
  },
  createStatus: {
    email: Boolean,
    sms: Boolean,
  },
  sendCoin: {
    email: Boolean,
    sms: Boolean,
  },
  receiveCoin: {
    email: Boolean,
    sms: Boolean,
  },
  transactionPinChange: {
    email: Boolean,
  },
  deviceChange: {
    email: Boolean,
  },
})

export const GeneralSettingsSchema = new mongoose.Schema({
  primaryCurrency: String,
  kycVerificationStatus: Number,
})

export const UserSettingsSchema = new mongoose.Schema({
  notificationSettings: NotificationSettingsSchema,
  generalSettings: GeneralSettingsSchema,
})

export const UserSchema = new mongoose.Schema({
  id: String,
  email: String,
  password: String,
  settings: UserSettingsSchema,
});