import { CurrencySymbol } from "../core/types";

/**
 * All transactions except sends are swaps. Buy and sell are just "syntactic sugar" for
 * fiat-crypto swap and crypto-fiat swap
 */
export interface BuyRequest {
  currencySymbol: CurrencySymbol
  coinSymbol: string
  fiatAmount: number
  coinAmount: number
  action: 'buy'
}

export interface SaleRequest {
  currencySymbol: CurrencySymbol
  coinSymbol: string
  fiatAmount: number
  coinAmount: number
  action: 'sell'
}

export interface CoinSwapRequest {
  fromCoinSymbol: string
  toCoinSymbol: string
  toCoinAmount: string
}

export interface CurrencySwapRequest {
  fromCurrencySymbol: CurrencySymbol
  toCurrencySymbol: CurrencySymbol
  toCurrencyAmount
}