import { Wallet } from "./models";

export const defaultWallets: Wallet[] = [
  {
    currencyName: 'bitcoin',
    currencySymbol: 'btc',
    balance: 0,
    ownerId: ''
  },
  {
    currencyName: 'ethereum',
    currencySymbol: 'eth',
    balance: 0,
    ownerId: ''
  },
  {
    currencyName: 'tether',
    currencySymbol: 'usdt',
    balance: 0,
    ownerId: ''
  },
  {
    currencyName: 'naira',
    currencySymbol: 'ngn',
    balance: 0,
    ownerId: ''
  }
]