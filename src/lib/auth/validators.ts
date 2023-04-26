import { NextFunction, type Request, type Response } from "express";
import Joi from "joi";
import { ErrorResponse } from "../../net";

const useSchemaToValidate = (schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: NextFunction) => {
  const validationState = schema.validate(req.body);
  if (validationState.hasOwnProperty('error')) {
    return res.status(400).send(createErrorResponseFromValidationState(validationState));
  }
  next();
}

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
  otp: Joi.number().integer().positive().max(99999),
})

const otpResendSchema = Joi.object({
  email: Joi.string().email().max(64).required(),
})

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().max(64).required(),
})

const passwordResetSchema = Joi.object({
  email: Joi.string().email().max(64).required(),
  otp: Joi.number().integer().positive().max(999999),
})

const passwordChangeSchema = Joi.object({
  email: Joi.string().email().max(64).required(),
  otp: Joi.number().integer().positive().max(999999),
  password: Joi.string().min(8).max(64).required(),
})

const createErrorResponseFromValidationState = (validationState: any) => {
  return new ErrorResponse(validationState.error.details[0].message);
}

export const validateLoginReqData = (req: Request, res: Response, next: NextFunction) => {
  useSchemaToValidate(loginReqBodySchema, req, res, next);
}

export const validateRegistrationData = (req: Request, res: Response, next: NextFunction) => {
  useSchemaToValidate(registrationReqBodySchema, req, res, next);
}

export const validateOTPSubmissionReqBody = (req: Request, res: Response, next: NextFunction) => {
  useSchemaToValidate(otpSchema, req, res, next);
}

export const validateOTPResendData = (req: Request, res: Response, next: NextFunction) => {
  useSchemaToValidate(otpResendSchema, req, res, next);
}

export const validatePasswordRetrievalData = (req: Request, res: Response, next: NextFunction) => {
  useSchemaToValidate(forgotPasswordSchema, req, res, next);
}

export const validatePasswordResetData = (req: Request, res: Response, next: NextFunction) => {
  useSchemaToValidate(passwordResetSchema, req, res, next);
}

export const validatePasswordChangeData = (req: Request, res: Response, next: NextFunction) => {
  useSchemaToValidate(passwordChangeSchema, req, res, next);
}
