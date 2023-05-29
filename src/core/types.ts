export type AuthenticatedRequest = Request & any;
export type CurrencySymbol = 'ngn' | 'usd' | 'eur' | 'gbp'

export interface Serializable {
  fromJson: (json: string) => any
  toJson: () => string
  toString: () => string
}