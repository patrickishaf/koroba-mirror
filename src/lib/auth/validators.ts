import { NextFunction, type Request, type Response } from "express";
import Joi from "joi";
import { ErrorResponse } from "../../net";

const loginReqBodySchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(64).required(),
  passsword: Joi.string().min(8).max(64).required(),
})

const registrationReqBodySchema = Joi.object({
  email: Joi.string().email().max(64).required(),
  password: Joi.string().min(8).max(64).required(),
})

export const validateLoginReqData = (req: Request, res: Response, next: NextFunction) => {
  const validationState = loginReqBodySchema.validate(req.body);
  if (validationState.hasOwnProperty('error')) {
    res.send(validationState);
  } else {
    next();
  }
}

export const validateRegistrationData = (req: Request, res: Response, next: NextFunction) => {
  const validationState = registrationReqBodySchema.validate(req.body);
  if (validationState.hasOwnProperty('error')) {
    return res.status(400).send(createErrorResponseFromValidationError(validationState));
  }
  next();
}

const createErrorResponseFromValidationError = (validationState: any) => {
  return new ErrorResponse(validationState.error.details[0].message);
}
