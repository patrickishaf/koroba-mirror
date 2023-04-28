import axios from "axios"
import { config } from "dotenv";
import { addAccessSignHeader, addTimestampHeader } from "./interceptors";

config();

const tradingHttpInstance = axios.create({
  baseURL: process.env.CB_BASE_URL,
  headers: {
    'CB-ACCESS-KEY': process.env.CB_API_KEY,
    'CB-ACCESS-PASSPHRASE': process.env.CB_PASSPHRASE,
    'Content-Type': 'application/json',
  }
})

tradingHttpInstance.interceptors.request.use(addAccessSignHeader);
tradingHttpInstance.interceptors.request.use(addTimestampHeader);

export default tradingHttpInstance;