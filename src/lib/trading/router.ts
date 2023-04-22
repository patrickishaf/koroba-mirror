import { Router } from "express";
import { getRates } from "./controller";
import authenticateUser from "../../middleware/authenticateUser";

const tradingRouter = Router();

tradingRouter.use(authenticateUser);

tradingRouter.get('/rates', getRates);

tradingRouter.get('/rate', (req, res) => {
  res.status(200).send("rate is rate");
})

export default tradingRouter;