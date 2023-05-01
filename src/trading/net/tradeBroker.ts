import { Spot } from '@binance/connector';
import { config as exposeEnvironmentVariables } from 'dotenv';

exposeEnvironmentVariables();

const apiKey = process.env.BN_API_KEY;
const secretKey = process.env.BN_SECRET_KEY;
const spotClient = new Spot(apiKey, secretKey);

export const getAccountInfo = async () => {
  try {
    const accountInfo = await spotClient.account();
    return accountInfo.data;
  } catch (e) {
    return new Error(e);
  }
}