import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../core/types';
import { createMissingWalletForUser, decrementWalletBalance, getRates as getExchangeRates, incrementWalletBalance } from './tradingService';
import { HttpStatusCode } from 'axios';
import { ErrorMessages, ErrorResponse, SuccessResponse } from '../net';
import { UserModel } from '../db/models';
import { Wallet } from '../wallets/models';

export const getRates = async (req: Request, res: Response) => {
  const { from, to } = req.query;
  const response = await getExchangeRates(from as string, to as string);
  // if (response.resolve()) {
  //   return res.status(HttpStatusCode.Ok).json(response);
  // }
  res.status(HttpStatusCode.InternalServerError).json(response);
}

export const getCoinInfo = async (req: Request, res: Response) => {
  res.status(HttpStatusCode.Ok).send('coin info endpoint is under construction');
}

export const getCoinPriceHistory = async (req: Request, res: Response) => {
  res.status(HttpStatusCode.Ok).send('coin price history endpoint is under construction');
}

export const buyCoin = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { fiatSymbol, cryptoSymbol, fiatAmount, cryptoAmount } = req.body;

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

    const existingUser = await UserModel.findOne({ email: req.user.email }).exec();

    let receivingWallet = existingUser.wallets.find((wallet) => wallet.currencySymbol === cryptoSymbol);
    const sendingWallet = existingUser.wallets.find((wallet) => wallet.currencySymbol === fiatSymbol);

    if (sendingWallet === undefined) return res.status(HttpStatusCode.NotAcceptable).json(ErrorResponse.from(ErrorMessages.noExistingWallet(fiatSymbol)))

    if (receivingWallet === undefined) {
      const newWallet: Wallet = {
        currencyName: req.body.currencyName,
        currencySymbol: cryptoSymbol,
        balance: 0,
        ownerId: existingUser.id
      };
      
      receivingWallet = await createMissingWalletForUser(newWallet, existingUser.id);
    }
    
    const rate = await getExchangeRates(cryptoSymbol, fiatSymbol);
    const fiatAmountUserNeedsToSpend = rate * cryptoAmount;

    if (sendingWallet.balance < fiatAmountUserNeedsToSpend) {
      return res.status(HttpStatusCode.Conflict).json(ErrorResponse.from(ErrorMessages.insufficientFiat(fiatSymbol, fiatAmountUserNeedsToSpend, cryptoAmount, cryptoSymbol)));
    }

    // if the user has enough fiat, trigger buy

    // decrease user's fiat balance
    await decrementWalletBalance(sendingWallet.toObject(), fiatAmountUserNeedsToSpend)

    // increase user's crypto balance
    await incrementWalletBalance(receivingWallet.toObject(), cryptoAmount)

    // create a transaction

    // save the transaction to the db

    // notify user via email

    // send push notification to user

    res.status(HttpStatusCode.Ok).send(`successfully bought ${cryptoAmount} ${cryptoSymbol.toUpperCase()} with ${fiatAmountUserNeedsToSpend} ${fiatSymbol.toUpperCase()}`);
  } catch (e) {
    const err = e as Error;
    return ErrorResponse.from(err.message);
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