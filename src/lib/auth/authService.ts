import { compare, genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { PendingOTPModel, UserModel } from "../../db/models";
import { ValidatedSignUpReqBody } from "./models";

export const saveUserToDb = async (user: ValidatedSignUpReqBody) => {
  try {
    const userModel = new UserModel(user);
    return await userModel.save();
  } catch (e) {
    const err = e as Error
    throw new Error(err.message);
  }
}

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await genSalt()
    const hashedPassword = await hash(password, salt)
    return hashedPassword;
  } catch (e) {
    const err = e as Error;
    throw new Error(err.message);
  }
}

export const checkIfEmailIsTaken = async (email: string): Promise<boolean> => {
  try {
    const existingUser = await UserModel.exists({ email })
    if (existingUser === null) return false;
    return true
  } catch (e) {
    const err = e as Error;
    throw new Error(err.message);
  }
}

export const findUserWithEmail = async (email: string) => {
  try {
    return await UserModel.findOne({ email }, 'email password').exec();
  } catch (e) {
    const err = e as Error;
    throw new Error(err.message);
  }
}

export const generateAccessToken = (user: any) => {
  return sign(user, process.env.JWT_SECRET);
}

export const generateRefreshToken = (user: any) => {
  return sign(user, process.env.REFRESH_TOKEN_SECRET);
}

export const checkIfPasswordsMatch = async (normalPassword: string, hashedPassword: string): Promise<boolean> => {
  try {
    return await compare(normalPassword, hashedPassword);
  } catch (e) {
    const err = e as Error;
    throw new Error(err.message);
  }
}

export const generateOTP = (): number => {
  const otp = Math.floor(Math.random() * 1000000)
  return otp;
}

export const saveOTPTemporarily = async (email: string, otp: number) => {
  try {
    const pendingOTP = new PendingOTPModel({ email, otp })
    return await pendingOTP.save();
  } catch (e) {
    const err = e as Error;
    throw new Error(err.message);
  }
}