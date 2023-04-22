import { type NextFunction, type Response } from "express";
import { verify } from "jsonwebtoken"
import { ErrorResponse } from "../net";
import * as ErrorMessages from "../net/errorMessages";

const authenticateUser = (req, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  const token = authorization && authorization.split(' ')[1]
  if (token === null) {
    return res.status(401).json(new ErrorResponse(ErrorMessages.unauthorized));
  } 
  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json(new ErrorResponse(ErrorMessages.invalidToken));
    req.user = user;
    next();
  })
}

export default authenticateUser;