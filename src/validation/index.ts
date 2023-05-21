import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ErrorResponse } from '../net';

export const useSchemaToValidate = (schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: NextFunction) => {
  const validationState = schema.validate(req.body);
  if (validationState.hasOwnProperty('error')) {
    return res.status(400).send(createErrorResponseFromValidationState(validationState));
  }
  next();
}

const createErrorResponseFromValidationState = (validationState: any) => {
  return ErrorResponse.from(validationState.error.details[0].message);
}