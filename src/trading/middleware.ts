import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../core/types";
import { HttpStatusCode } from "axios";
import { ErrorResponse } from "../net";
import { UserModel } from "../db/models";
import * as walletService from "../wallets/walletService";
import { Wallet } from "../wallets/models";

export const ensureUserHasCryptoWallet = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.user.email }).exec();
    const matchingWallet = existingUser.wallets.find((wallet) => wallet.currencySymbol === req.body.cryptoSymbol);

    if (matchingWallet === undefined) {
      const newWallet: Wallet = {
        currencyName: req.body.currencyName,
        currencySymbol: req.body.cryptoSymbol,
        balance: 0,
        ownerId: existingUser.id
      };
      
      await walletService.createSingleWalletForUser(newWallet, existingUser.id);
    }

    next();
  } catch (e) {
    const err = e as Error
    res.status(HttpStatusCode.InternalServerError).json(ErrorResponse.from(err.message));
  }
}

export const ensureUserHasCryptoBalance = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {}

export const ensureUserHasFiatBalance = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {}