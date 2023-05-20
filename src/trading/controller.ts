import { Request, Response } from "express"
import { HttpClient, tradingResponseHandler } from "../net"
import trading_urls from "./urls";
import { AuthenticatedRequest } from "../core/types";

export const getRates = async (req: Request, res: Response) => {
  const { from, to } = req.query;
  const response = await new HttpClient().setResponseHandler(tradingResponseHandler).get(trading_urls.getRates(from as string, to as string));
  if (response.resolve()) {
    return res.status(200).json(response);
  }
  res.status(500).json(response);
}

export const getCoinInfo = async (req: Request, res: Response) => {
  res.status(200).send("coin info endpoint is under construction");
}

export const getCoinPriceHistory = async (req: Request, res: Response) => {
  res.status(200).send("coin price history endpoint is under construction");
}

export const buyCoin = (req: AuthenticatedRequest, res: Response) => {}

export const sellCoin = (req: AuthenticatedRequest, res: Response) => {}

export const swapFiat = (req: AuthenticatedRequest, res: Response) => {}

export const swapCoin = (req: AuthenticatedRequest, res: Response) => {}