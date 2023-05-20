import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../core/types";

export const ensureUserHasCurrencyWallet = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Logic to fetch the wallet with userID
}

export const ensureUserHasCryptoBalance = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {}

export const ensureUserHasFiatBalance = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {}