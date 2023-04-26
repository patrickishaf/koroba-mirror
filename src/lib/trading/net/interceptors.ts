import { InternalAxiosRequestConfig } from "axios";
import * as crypto from "crypto";

export const addAccessSignHeader = (req): InternalAxiosRequestConfig => {
  const timestamp = Date.now() / 1000
  const secret = process.env.CB_API_SECRET;
  const requestPath = req.url;
  const body = JSON.stringify(req.body)
  const method = req.method.toUpperCase();

  const message = timestamp + method + requestPath + body;
  const key = Buffer.from(secret, 'base64');
  const hmac = crypto.createHmac('sha256', key);

  const cbAccessSign = hmac.update(message).digest('base64');

  req.headers['CB-ACCESS-SIGN'] = cbAccessSign;
  return req
}

export const addTimestampHeader = (req: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const timestamp = Date.now() / 1000;

  req.headers['CB-ACCESS-TIMESTAMP'] = timestamp;
  return req
}