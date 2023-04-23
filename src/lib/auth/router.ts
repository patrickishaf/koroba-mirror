import { Router } from 'express';
import { validateLoginReqData, validateOTPSubmissionReqBody, validateRegistrationData } from './validators';
import { login, /* resendVerificationEmail, */ signUp, verifyRegistrationEmail } from './authControllers';
import authenticateUser from '../../middleware/authenticateUser';

const authRouter = Router();

authRouter.post('/register', validateRegistrationData, signUp);

authRouter.post('/login', validateLoginReqData, authenticateUser, login);

authRouter.post('/verify-email-reg', validateOTPSubmissionReqBody, verifyRegistrationEmail);

export default authRouter;