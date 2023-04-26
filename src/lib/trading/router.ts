import { Router } from "express";
import { getRates } from "./controller";
import authenticateUser from "../../middleware/authenticateUser";

const tradingRouter = Router();

tradingRouter.use(authenticateUser);

tradingRouter.get('/rates', getRates);

export default tradingRouter;