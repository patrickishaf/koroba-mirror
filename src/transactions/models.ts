export type TransactionType = 'buy' | 'sell' | 'send' | 'swap'

export interface TransactionParticipant {
  userId: string
  walletSymbol: string
  previousWalletBalance: number
  newWalletBalance: number
  amount: number
}

export interface Transaction {
  id?: string
  timestamp: number
  type: TransactionType
  fromDetails: TransactionParticipant
  toDetails: TransactionParticipant
}