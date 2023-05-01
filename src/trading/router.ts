import { Response, Router } from "express";
import { getRates } from "./controller";
import authenticateUser from "../middleware/authenticateUser";
// import { getAccountInfo } from "./net/broker";
import { ErrorResponse, SuccessResponse } from "../net";
import { getAccountInfo } from "./net/tradeBroker";

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

export default tradingRouter;