import { Router } from 'express';
import { validateLoginReqData, validateOTPResendData, validateOTPSubmissionReqBody, validateRegistrationData } from './validators';
import { login, resendVerificationEmail, signUp, verifyLoginEmail, verifyRegistrationEmail } from './authControllers';
import authenticateUser from '../../middleware/authenticateUser';

const authRouter = Router();

authRouter.post('/register', validateRegistrationData, signUp);

authRouter.post('/login', validateLoginReqData, authenticateUser, login);

authRouter.post('/verify-email-reg', validateOTPSubmissionReqBody, verifyRegistrationEmail);

authRouter.post('/verify-login-reg', validateOTPSubmissionReqBody, verifyLoginEmail);

authRouter.post('/resend-otp', validateOTPResendData, resendVerificationEmail);

export default authRouter;