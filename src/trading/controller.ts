import { Request, Response } from "express"
import HttpClient from "../net/httpClient"
import trading_urls from "./urls";
import tradingResponseHandler from "./tradingResponseHandler";

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

export const sendCoin = async (req: Request, res: Response) => {
  res.status(200).send("send coin endpoint is under construction");
}