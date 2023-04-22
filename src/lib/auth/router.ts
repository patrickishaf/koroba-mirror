import { Router } from 'express';
import { validateLoginReqData } from './validators';
import { signUp } from './authControllers';

const authRouter = Router();

authRouter.post('/register', signUp);

authRouter.post('/login', validateLoginReqData, (_, res) => {
  res.send('login successful');
});

export default authRouter;