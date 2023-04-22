import { type NextFunction, type Request, type Response } from "express";
import { verify } from "jsonwebtoken"
import { ErrorResponse } from "../net";
import * as ErrorMessages from "../net/errorMessages";

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (authorization === undefined) {
    return res.status(401).json(new ErrorResponse(ErrorMessages.unauthorized))
  }
  const token = authorization && authorization.split(' ')[1]
  const isValid = verify(token)
  next();
}

export default authenticateUser;