import { Router } from 'express';
import { validateLoginReqData, validateRegistrationData } from './validators';
import { login, resendVerificationEmail, signUp } from './authControllers';
import authenticateUser from '../../middleware/authenticateUser';

const authRouter = Router();

authRouter.post('/register', validateRegistrationData, signUp);

authRouter.post('/login', validateLoginReqData, authenticateUser, login);

authRouter.get('/', resendVerificationEmail);

export default authRouter;