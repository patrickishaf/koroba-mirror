import { Router } from "express";

const walletsRouter = Router();

walletsRouter.get('/', (req, res) => {
  res.send('these are all the availble wallets')
})

export default walletsRouter;