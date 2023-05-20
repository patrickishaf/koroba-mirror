import { Response, Router } from "express";
import { buyCoin, getRates, sellCoin, swapCoin, swapFiat } from "./controller";
import authenticateUser from "../middleware/authenticateUser";
import { ErrorResponse, SuccessResponse } from "../net";
import { getAccountInfo } from "./tradingService";

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

tradingRouter.post('/buy', authenticateUser, buyCoin);

tradingRouter.post('/sell', authenticateUser, sellCoin);

tradingRouter.post('/swap-fiat', authenticateUser, swapFiat);

tradingRouter.post('/swap-coin', authenticateUser, swapCoin);

export default tradingRouter;