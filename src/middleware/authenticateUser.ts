import { type NextFunction, type Response } from "express";
import { verify } from "jsonwebtoken";
import { ErrorResponse, ErrorMessages } from "../net";

const authenticateUser = (req: Request & any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (authorization === null || authorization === undefined) return res.status(401).json(ErrorResponse.from(ErrorMessages.noAuthHeader));
  if (!authorization.startsWith('Bearer')) return res.status(401).json(ErrorResponse.from(ErrorMessages.invalidAuthHeader));

  const token = authorization.split(' ')[1];

  if (token === null) return res.status(401).json(ErrorResponse.from(ErrorMessages.unauthorized));

  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json(ErrorResponse.from(ErrorMessages.invalidToken));
    req.user = user;
    next();
  })
}

export default authenticateUser;