import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../core/types';
import { createMissingWalletForUser, getRates as getExchangeRates } from './tradingService';
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

    const existingUser = await UserModel.findOne({ email: req.user.email }).exec();
    let matchingWallet = existingUser.wallets.find((wallet) => wallet.currencySymbol === req.body.cryptoSymbol);

    if (matchingWallet === undefined) {
      const newWallet: Wallet = {
        currencyName: req.body.currencyName,
        currencySymbol: req.body.cryptoSymbol,
        balance: 0,
        ownerId: existingUser.id
      };
      
      matchingWallet = await createMissingWalletForUser(newWallet, existingUser.id);
    }
    
    const rate = await getExchangeRates(cryptoSymbol, fiatSymbol);
    const amountUserNeedsToSpend = rate * cryptoAmount;

    if (matchingWallet.balance < amountUserNeedsToSpend) {
      return res.status(HttpStatusCode.Conflict).json(ErrorResponse.from(ErrorMessages.insufficientFiat(fiatSymbol, amountUserNeedsToSpend, cryptoAmount, cryptoSymbol)));
    }

    // if the user has enough fiat, trigger buy

    // decrease user's fiat balance

    // increase user's crypto balance

    // create a transaction

    // save the transaction to the db

    // notify user via email

    // send push notification to user

    res.status(HttpStatusCode.Ok).json('still under construction');
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