import { ErrorResponse, SuccessResponse } from "../../net/responses";
import { hashPassword, checkIfEmailIsTaken, saveUserToDb, generateAccessToken, generateRefreshToken } from "./authService";
import { ValidatedSignUpReqBody } from "./models";

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body as ValidatedSignUpReqBody;
    const emailIsAlreadyTaken = await checkIfEmailIsTaken(email);
    if (emailIsAlreadyTaken) {
      return res.status(201).json(new ErrorResponse('this email has already been used'));
    }
    const hashedPassword = await hashPassword(password)
    const user: ValidatedSignUpReqBody = {
      email,
      password: hashedPassword
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const result = await saveUserToDb(user);
    res.status(200).json(new SuccessResponse({
      email: result.email,
      accessToken: accessToken,
      refreshToken: refreshToken
    }));
  } catch (e) {
    const err = e as Error;
    res.status(500).json(new ErrorResponse(err.message));
  }
}