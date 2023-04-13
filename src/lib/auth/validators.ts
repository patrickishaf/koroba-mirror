import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const loginReqBodySchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  passsword: Joi.string().pattern(new RegExp('/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/')),
})

const registrationReqBodySchema = Joi.object({
  email: Joi.string().alphanum().min(3).max(30).required,
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
    res.send(validationState);
  } else {
    next();
  }
}
