import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../core/types';
import { createMissingWalletForUser, decrementWalletBalance, generateNewId, getRates as getExchangeRates, incrementWalletBalance, saveTransactionIdToUserTransactions } from './tradingService';
import { HttpStatusCode } from 'axios';
import { ErrorMessages, ErrorResponse, SuccessResponse } from '../net';
import { UserModel } from '../db/models';
import { Wallet } from '../wallets/models';
import { TransactionBuilder, TransactionParticipantBuilder } from '../transactions/builders';
import TransactionType from '../transactions/transactionType';
import transactionEventListener from '../transactions/transactionEventListener';
import { TradingEvents } from '../core/events';

export const getRates = async (req: Request, res: Response) => {
  console.log('execution has gotten to this function')
  try {
    const { from, to } = req.query;
    const rate = await getExchangeRates(from as string, to as string);
    res.status(HttpStatusCode.Ok).json({
      from,
      to,
      rate,
    })
  } catch(e) {
    const err = e as Error
    console.log({ err })
    res.status(HttpStatusCode.InternalServerError).json(ErrorResponse.from(err.message))
  }
}

export const getCoinInfo = async (_: Request, res: Response) => {
  res.status(HttpStatusCode.Ok).send('coin info endpoint is under construction');
}

export const getCoinPriceHistory = async (req: Request, res: Response) => {
  res.status(HttpStatusCode.Ok).send('coin price history endpoint is under construction');
}

/**
 * If a user wants to buy CRYPTO with FIAT, they will have two wallets - a FIAT wallet and a CRYPTO wallet
 * By default, they will have an FIAT wallet because it will be created for them on account registration
 * 
 * If they don't have a CRYPTO wallet, it will be created for them by this process.
 * 
 * You will find out the equivalent of the amount of CRYPTO they want to buy in FIAT.
 * Then you will find out if their FIAT balance is up to it.
 * If their FIAT balance is not up to it, send them an error
 * If their FIAT balance is enough, decrement their FIAT wallet and increment their crypto wallet.
 * 
 * Dispatch notifications to the user
 * Create a transaction and save it in the db
 */
export const buyCoin = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { fiatSymbol, cryptoSymbol, cryptoAmount } = req.body;

    const existingUser = await UserModel.findOne({ email: req.user.email }).exec();

    let cryptoWallet = existingUser.wallets.find((wallet) => wallet.currencySymbol === cryptoSymbol);
    const fiatWallet = existingUser.wallets.find((wallet) => wallet.currencySymbol === fiatSymbol);

    if (fiatWallet === undefined) return res.status(HttpStatusCode.NotAcceptable).json(ErrorResponse.from(ErrorMessages.noExistingWallet(fiatSymbol)))

    if (cryptoWallet === undefined) {
      const newWallet: Wallet = {
        currencyName: req.body.currencyName,
        currencySymbol: cryptoSymbol,
        balance: 0,
        ownerId: existingUser.id
      };

      cryptoWallet = await createMissingWalletForUser(newWallet, existingUser.id);
    }
    
    const rate = await getExchangeRates(cryptoSymbol, fiatSymbol);
    const fiatAmountUserNeedsToSpend = rate * cryptoAmount;

    if (fiatWallet.balance < fiatAmountUserNeedsToSpend) {
      return res.status(HttpStatusCode.Conflict).json(ErrorResponse.from(ErrorMessages.insufficientFiat(fiatSymbol, fiatAmountUserNeedsToSpend, cryptoAmount, cryptoSymbol)));
    }

    // if the user has enough fiat, trigger buy
    // decrease user's fiat balance
    const decrementedFiatWallet = await decrementWalletBalance(fiatWallet.toObject(), fiatAmountUserNeedsToSpend)

    // increase user's crypto balance
    const incrementedCryptoWallet = await incrementWalletBalance(cryptoWallet.toObject(), cryptoAmount)

    const txSender = new TransactionParticipantBuilder()
          .setUserId(existingUser.id)
          .setWalletSymbol(fiatWallet.currencySymbol)
          .setAmount(fiatAmountUserNeedsToSpend)
          .setPreviousWalletBalance(fiatWallet.balance)
          .setNewWalletBalance(decrementedFiatWallet.balance)
          .build()
    
    const txReceiver = new TransactionParticipantBuilder()
            .setUserId(existingUser.id)
            .setWalletSymbol(cryptoWallet.currencySymbol)
            .setAmount(cryptoAmount)
            .setPreviousWalletBalance(cryptoWallet.balance)
            .setNewWalletBalance(incrementedCryptoWallet.balance)
            .build()
    
    const txnId = generateNewId()
    const txn = new TransactionBuilder()
            .setId(txnId)
            .setType(TransactionType.buy)
            .setFromDetails(txSender)
            .setToDetails(txReceiver)
            .setTimeStamp()
            .build()

    // // save the transaction to the db
    await saveTransactionIdToUserTransactions(existingUser.id, txnId)
    transactionEventListener.emit(TradingEvents.SAVE_TRANSACTION, txn)

    // notify user via email

    // send push notification to user
    res.status(HttpStatusCode.Ok).json(SuccessResponse.from(txn))
  } catch (e) {
    const err = e as Error;
    res.status(HttpStatusCode.InternalServerError).json(ErrorResponse.from(err.message))
  }
}

export const sellCoin = (req: AuthenticatedRequest, res: Response) => {
  res.status(HttpStatusCode.Ok).send('sell coin endpoint is under construction');
}

export const swapFiat = (req: AuthenticatedRequest, res: Response) => {
  res.status(HttpStatusCode.Ok).send('swap fiat endpoint is under construction');
}

export const swapCoin = (req: AuthenticatedRequest, res: Response) => {
  res.status(HttpStatusCode.Ok).send('swap coin endpoint is under construction');
}