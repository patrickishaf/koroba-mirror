export interface Wallet {
  currencyName: string
  currencySymbol: string
  balance: number
  ownerId: string
}

interface BuyCoinReqBody {
  cryptoSymbol: string
  fiatSymbol: string
  cryptoAmount: number
  fiatAmount: number
}

interface SellCoinReqBody {
  cryptoSymbol: string
  fiatSymbol: string
  cryptoAmount: number
  fiatAmount: number
}