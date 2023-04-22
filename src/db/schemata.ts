import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  email: String,
});

export const notificationSchema = new mongoose.Schema({
  message: String,
});

export const priceAlertSchema = new mongoose.Schema({
  title: String,
  message: String,
  type: String,
  timestamp: Date
})

export const userSettingSchema = new mongoose.Schema({
  key: String,
  value: Boolean
})

export const transactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
});

export const coinSchema = new mongoose.Schema({
  name: String,
  symbol: String,
});

export const walletSchema = new mongoose.Schema({
  network: String,
  address: String,
  balance: Number,
});
