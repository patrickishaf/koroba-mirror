import { NextFunction, type Request, type Response } from "express";
import Joi from "joi";
import { ErrorResponse } from "../../net";

const loginReqBodySchema = Joi.object({
  email: Joi.string().email().max(64).required(),
  password: Joi.string().min(8).max(64).required(),
})

const registrationReqBodySchema = Joi.object({
  email: Joi.string().email().max(64).required(),
  password: Joi.string().min(8).max(64).required(),
})

const otpSchema = Joi.object({
  email: Joi.string().email().max(64).required(),
  otp: Joi.number().integer().positive().max(999999),
})

const createErrorResponseFromValidationState = (validationState: any) => {
  return new ErrorResponse(validationState.error.details[0].message);
}

export const validateLoginReqData = (req: Request, res: Response, next: NextFunction) => {
  const validationState = loginReqBodySchema.validate(req.body);
  if (validationState.hasOwnProperty('error')) {
    res.status(400).send(createErrorResponseFromValidationState(validationState));
  } else {
    next();
  }
}

export const validateRegistrationData = (req: Request, res: Response, next: NextFunction) => {
  const validationState = registrationReqBodySchema.validate(req.body);
  if (validationState.hasOwnProperty('error')) {
    return res.status(400).send(createErrorResponseFromValidationState(validationState));
  }
  next();
}

export const validateOTPSubmissionReqBody = (req: Request, res: Response, next: NextFunction) => {
  const validationState = otpSchema.validate(req.body);
  if (validationState.hasOwnProperty('error')) {
    res.status(400).send(createErrorResponseFromValidationState(validationState));
  } else {
    next();
  }
}
