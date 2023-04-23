import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../net/responses";
import { hashPassword, checkIfEmailIsTaken, saveUserToDb, generateAccessToken, generateRefreshToken, findUserWithEmail, checkIfPasswordsMatch, saveOTPTemporarily, generateOTP } from "./authService";
import { ValidatedLoginReqBody, ValidatedSignUpReqBody } from "./models";
import * as ErrorMessages from "../../net/errorMessages";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as ValidatedSignUpReqBody;

    const emailIsAlreadyTaken = await checkIfEmailIsTaken(email);

    if (emailIsAlreadyTaken) {
      return res.status(201).json(ErrorResponse.from(ErrorMessages.emailAlreadyInUse));
    }

    const hashedPassword = await hashPassword(password)

    const user: ValidatedSignUpReqBody = {
      email,
      password: hashedPassword
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const result = await saveUserToDb(user);
    
    res.status(200).json(SuccessResponse.from({
      email: result.email,
      accessToken: accessToken,
      refreshToken: refreshToken
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

    const accessToken = generateAccessToken({
      email: user.email,
      password: user.password,
    });

    res.status(200).json(SuccessResponse.from({
      ...user,
      accessToken,
    }));
  } catch (e) {
    const err = e as Error;
    res.status(500).json(ErrorResponse.from(err.message));
  }
}

export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    // TODO: Add email validation to tis endpoint so that a user willnot generate an OTP for an unverified email
    const result = await saveOTPTemporarily(req.body.email, generateOTP());
    res.status(200).send(SuccessResponse.from({
      otp: result.otp
    }));
  } catch (e) {
    const err = e as Error;
    res.status(500).json(ErrorResponse.from(err.message));
  }
}