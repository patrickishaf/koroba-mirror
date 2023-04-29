import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../net/responses";
import { 
  hashPassword,
  checkIfEmailIsTaken,
  saveUserToDb,
  generateAccessToken,
  generateRefreshToken,
  findUserWithEmail,
  checkIfPasswordsMatch,
  saveOTPDataTemporarily,
  generateOTP,
  findOTPRecordWithMatchingEmail,
  clearOTPData,
  invalidateOTP,
  revalidateOTP,
  generatePasswordResetOTP,
  changePassword,
  generateUserID
} from "./authService";
import {
  OTPResendReqData,
  TemporaryOTPData,
  ValidatedLoginReqBody,
  ValidatedOTPSubmissionReqBody,
  ValidatedSignUpReqBody
} from "./models";
import * as ErrorMessages from "../net/errorMessages";
import { OTP_INVALIDATION_DELAY } from "./utils";
import settingsEventBus from "../settings/settingsEventBus";
import { SettingsEvents } from "../core/events";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as ValidatedSignUpReqBody;

    const emailIsAlreadyTaken = await checkIfEmailIsTaken(email);

    if (emailIsAlreadyTaken) {
      return res.status(201).json(ErrorResponse.from(ErrorMessages.emailAlreadyInUse));
    }

    const hashedPassword = await hashPassword(password)
    const otp = generateOTP();

    const temporaryOTPData: TemporaryOTPData = {
      email,
      password: hashedPassword,
      otp
    }

    /**
     * This invalidates the OTP after some time. the time is given by the constant OTP_INVALIDATION_DELAY
     */
    setTimeout(() => {
      async function invalidate() {
        /**
         * This function will return null if the otp has already been verified and cleared.
         * It won't throw an error and interrupt the reg flow so there's no need to handle its error case.
         */
        await invalidateOTP(email)
      }
      invalidate();
    }, OTP_INVALIDATION_DELAY);

    const result = await saveOTPDataTemporarily(temporaryOTPData);
    
    res.status(200).json(SuccessResponse.from({
      email: result.email,
      otp: result.otp
    }));
  } catch (e) {
    const err = e as Error;
    res.status(500).json(ErrorResponse.from(err.message));
  }
}

export const login =  async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as ValidatedLoginReqBody;
    const user = await findUserWithEmail(email);

    if (user === null) return res.status(404).json(ErrorResponse.from(ErrorMessages.nonExistentUser));

    const passwordsMatch = await checkIfPasswordsMatch(password, user.password);

    if (!passwordsMatch) return res.status(401).json(ErrorResponse.from(ErrorMessages.unauthorized));

    const otp = generateOTP();

    const temporaryOTPData: TemporaryOTPData = {
      email,
      password: user.password,
      otp
    }

    setTimeout(() => {
      async function invalidate() {
        // This function will return null if the otp has already been verified and cleared. It won't throw an error and interrupt the reg flow so there's no need to handle its error case.
        await invalidateOTP(email)
      }
      invalidate();
    }, OTP_INVALIDATION_DELAY);

    const result = await saveOTPDataTemporarily(temporaryOTPData);

    res.status(200).json(SuccessResponse.from({
      email,
      otp: result.otp
    }));
  } catch (e) {
    const err = e as Error;
    res.status(500).json(ErrorResponse.from(err.message));
  }
}

export const verifyRegistrationEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body as ValidatedOTPSubmissionReqBody;
    const pendingOTPRecord = await findOTPRecordWithMatchingEmail(email);

    if (pendingOTPRecord === null) return res.status(403).json(ErrorResponse.from(ErrorMessages.expiredOTP));
    if (pendingOTPRecord.isExpired === true) return res.status(403).json(ErrorResponse.from(ErrorMessages.expiredOTP));
    if (pendingOTPRecord.otp !== otp) return res.status(403).json(ErrorResponse.from(ErrorMessages.invalidOTP));

    const userID = generateUserID();

    const user = {
      id: userID,
      email,
      password: pendingOTPRecord.password,
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await clearOTPData(user.email);

    const result = await saveUserToDb(user);
    
    settingsEventBus.emit(SettingsEvents.CREATE_USER_SETTINGS, result.id);

    res.status(200).json(SuccessResponse.from({
      id: result.id,
      email: result.email,
      accessToken: accessToken,
      refreshToken: refreshToken
    }));

  } catch (e) {
    const err = e as Error;
    res.status(500).json(ErrorResponse.from(err.message));
  }
}

export const verifyLoginEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body as ValidatedOTPSubmissionReqBody;
    const pendingOTPRecord = await findOTPRecordWithMatchingEmail(email);

    if (pendingOTPRecord === null) return res.status(403).json(ErrorResponse.from(ErrorMessages.expiredOTP));
    if (pendingOTPRecord.isExpired === true) return res.status(403).json(ErrorResponse.from(ErrorMessages.expiredOTP));
    if (pendingOTPRecord.otp !== otp) return res.status(403).json(ErrorResponse.from(ErrorMessages.invalidOTP));
    
    const accessToken = generateAccessToken({
      email: pendingOTPRecord.email,
      password: pendingOTPRecord.password,
    });

    await clearOTPData(pendingOTPRecord.email);

    res.status(200).json(SuccessResponse.from({
      email: pendingOTPRecord.email,
      accessToken,
    }));
  } catch (e) {
    const err = e as Error;
    res.status(500).json(ErrorResponse.from(err.message));
  }
}

export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as OTPResendReqData;
    const existingOTPRecord = await findOTPRecordWithMatchingEmail(email);

    if (existingOTPRecord === null) return res.status(405).json(ErrorResponse.from(ErrorMessages.noPendingOTP))
    if (existingOTPRecord.isExpired === false) return res.status(403).json(ErrorResponse.from(ErrorMessages.OTPStillValid));

    const otp = generateOTP();
    await revalidateOTP(email, otp);

    res.status(200).json(SuccessResponse.from({
      email,
      otp,
    }));
  } catch (e) {
    const err = e as Error;
    res.status(500).json(ErrorResponse.from(err.message));
  }
}

export const startPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const userWithEmailExists = await checkIfEmailIsTaken(email);

    if (!userWithEmailExists) return res.status(404).json(ErrorResponse.from(ErrorMessages.nonExistentUser));

    const otp = generatePasswordResetOTP();

    // TODO: CHECK IF PASSWORD RESET IS IN PROGRESS TO AVOID INSERTING INTO THE DB MULTIPLE TIMES

    const result = await saveOTPDataTemporarily({
      email,
      password: '',
      otp,
      isExpired: false,
    })

    res.status(200).send(SuccessResponse.from({
      email: result.email,
      otp: result.otp,
    }));
  } catch (e) {
    const err = e as Error;
    res.status(500).json(ErrorResponse.from(err.message));
  }
}

export const completePasswordReset = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const pendingOTPRecord = await findOTPRecordWithMatchingEmail(email);

    if (pendingOTPRecord === null) return res.status(403).json(ErrorResponse.from(ErrorMessages.unauthorized));
    if (pendingOTPRecord.isExpired === true) return res.status(403).json(ErrorResponse.from(ErrorMessages.expiredOTP));
    if (pendingOTPRecord.otp !== otp) return res.status(403).json(ErrorResponse.from(ErrorMessages.invalidOTP));

    res.status(200).json(SuccessResponse.from({
      message: 'can_proceed',
      otp,
      email,
    }))
  } catch (e) {
    const err = e as Error;
    res.status(500).json(ErrorResponse.from(err.message));
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, password } = req.body;

    const pendingOTPRecord = await findOTPRecordWithMatchingEmail(email);

    if (pendingOTPRecord === null) return res.status(403).json(ErrorResponse.from(ErrorMessages.unauthorized));
    if (pendingOTPRecord.isExpired === true) return res.status(403).json(ErrorResponse.from(ErrorMessages.expiredOTP));
    if (pendingOTPRecord.otp !== otp) return res.status(403).json(ErrorResponse.from(ErrorMessages.invalidOTP));

    const hashedPassword = await hashPassword(password);
    const userWithNewPassword = await changePassword(hashedPassword, email);

    await clearOTPData(email);

    res.status(200).json(SuccessResponse.from({
      email: userWithNewPassword.email
    }));
  } catch (e) {
    const err = e as Error;
    res.status(500).json(ErrorResponse.from(err.message));
  }
}