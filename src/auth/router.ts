import { Router } from 'express';
import { validateLoginReqData, validateOTPResendData, validateOTPSubmissionReqBody, validatePasswordChangeData, validatePasswordResetData, validatePasswordRetrievalData, validateRegistrationData } from './validators';
import { completePasswordReset, login, resendVerificationEmail, resetPassword, signUp, startPasswordReset, verifyLoginEmail, verifyRegistrationEmail } from './authControllers';
import authenticateUser from '../middleware/authenticateUser';

const authRouter = Router();

authRouter.post('/register', validateRegistrationData, signUp);

authRouter.post('/login', validateLoginReqData, authenticateUser, login);

authRouter.post('/verify-email-reg', validateOTPSubmissionReqBody, verifyRegistrationEmail);

authRouter.post('/verify-login-reg', validateOTPSubmissionReqBody, verifyLoginEmail);

authRouter.post('/resend-otp', validateOTPResendData, resendVerificationEmail);

authRouter.post('/start-password-reset', validatePasswordRetrievalData, startPasswordReset);

authRouter.post('/complete-password-reset', validatePasswordResetData, completePasswordReset);

authRouter.post('/change-password', validatePasswordChangeData, resetPassword);

export default authRouter;