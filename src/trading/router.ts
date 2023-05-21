import { Response, Router } from "express";
import { buyCoin, getRates, sellCoin, swapCoin, swapFiat } from "./controller";
import authenticateUser from "../middleware/authenticateUser";
import { ErrorResponse, SuccessResponse } from "../net";
import { getAccountInfo } from "./tradingService";
import { ensureUserHasCryptoWallet } from "./middleware";
import { validateBuyCoinReqBody } from "./validators";

const tradingRouter = Router();

tradingRouter.use(authenticateUser);

tradingRouter.get('/rates', getRates);

tradingRouter.get('/test', async (_, res: Response) => {
  try {
    const info = await getAccountInfo();
    res.status(200).json(SuccessResponse.from(info));
  } catch (e) {
    const err = e as Error;
    res.status(500).json(ErrorResponse.from(err.message));
  }
})

tradingRouter.patch('/buy', validateBuyCoinReqBody, authenticateUser, ensureUserHasCryptoWallet, buyCoin);

tradingRouter.patch('/sell', authenticateUser, sellCoin);

tradingRouter.patch('/swap-fiat', authenticateUser, swapFiat);

tradingRouter.patch('/swap-coin', authenticateUser, swapCoin);

export default tradingRouter;