import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { useSchemaToValidate } from "../validation";

const buyCoinReqBodySchema = Joi.object({
  cryptoSymbol: Joi.string().required(),
  fiatSymbol: Joi.string().required(),
  cryptoAmount: Joi.number().required(),
  fiatAmount: Joi.number().required()
});

export const validateBuyCoinReqBody = (req: Request, res: Response, next: NextFunction) => {
  useSchemaToValidate(buyCoinReqBodySchema, req, res, next);
}