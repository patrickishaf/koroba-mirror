import { Spot } from '@binance/connector';
import { config as exposeEnvironmentVariables } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { ErrorResponse, HttpClient, SuccessResponse, tradingResponseHandler } from '../net';
import trading_urls from './urls';
import { createSingleWalletForUser } from '../wallets/walletService';
import { Wallet } from '../wallets/models';
import { UserModel, WalletModel } from '../db/models';

exposeEnvironmentVariables();

const apiKey = process.env.BN_API_KEY;
const secretKey = process.env.BN_SECRET_KEY;
const spotClient = new Spot(apiKey, secretKey);

const convertExponentialNumberToFixed = (numberInStringForm: string) => {
  return parseFloat(Number.parseFloat(numberInStringForm).toFixed(18));
}

export const getRates = async (from: string, to: string) => {
  try {
    const response = await new HttpClient().setResponseHandler(tradingResponseHandler).get(trading_urls.getRates(from, to));
    if (response.resolve()) {
      const expRate = (response as SuccessResponse).data[to.toUpperCase()];
      return convertExponentialNumberToFixed(expRate);
    }
    throw new Error((response as ErrorResponse).message);
  } catch (e) {
    const err = e as Error;
    throw new Error(err.message);
  }
}

export const createMissingWalletForUser = async (wallet: Wallet, userID: string) => {
  try {
    const userWallets = await createSingleWalletForUser(wallet, userID);
    return userWallets[userWallets.length - 1];
  } catch (e) {
    const err = e as Error;
    throw new Error(err.message);
  }
}

export const getAccountInfo = async () => {
  try {
    const accountInfo = await spotClient.account();
    return accountInfo.data;
  } catch (e) {
    const err = e as Error;
    throw new Error(err.message);
  }
}

export const decrementWalletBalance = async (walletData: Wallet, byAmount: number) => {
  try {
    const walletOwner = await UserModel.findOne({ id: walletData.ownerId }).exec()
    const decrementedWallet = await walletOwner.wallets.find((wallet) => wallet.currencySymbol === walletData.currencySymbol)
    decrementedWallet.balance = decrementedWallet.balance - byAmount
    await walletOwner.save()
    return decrementedWallet
  } catch (e) {
    const err = e as Error
    throw new Error(err.message)
  }
}

export const incrementWalletBalance = async (walletData: Wallet, byAmount: number) => {
  try {
    const walletOwner = await UserModel.findOne({ id: walletData.ownerId }).exec()
    const incrementedWallet = await walletOwner.wallets.find((wallet) => (wallet.currencySymbol === walletData.currencySymbol))
    incrementedWallet.balance = incrementedWallet.balance + byAmount
    await walletOwner.save()
    return incrementedWallet
  } catch (e) {
    const err = e as Error
    throw new Error(err.message)
  }
}

export const generateNewId = () => uuidv4()

export const saveTransactionIdToUserTransactions = async (userId: string, transactionId: string) => {
  try {
    const user = await UserModel.findOne({ id: userId }).exec()
    user.transactionIds.push(transactionId)
    await user.save()
  } catch(e) {
    const err = e as Error
    throw new Error(err.message)
  }
}