import { Router } from 'express';
import { validateLoginReqData, validateRegistrationData } from './validators';
import { signUp } from './authControllers';

const authRouter = Router();

authRouter.post('/register', validateRegistrationData, signUp);

authRouter.post('/login', validateLoginReqData, (_, res) => {
  res.send('login successful');
});

export default authRouter;