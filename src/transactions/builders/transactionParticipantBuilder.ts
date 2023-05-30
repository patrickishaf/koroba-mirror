import { TransactionParticipant } from '../models'

export default class TransactionParticipantBuilder {
  participant: TransactionParticipant

  constructor() {
    this.participant = {
      userId: '',
      walletSymbol: '',
      previousWalletBalance: 0,
      newWalletBalance: 0,
      amount: 0
    }
  }

  build(): TransactionParticipant {
    return this.participant as TransactionParticipant
  }

  setUserId(userId: string): TransactionParticipantBuilder {
    this.participant.userId = userId
    return this
  }

  setWalletSymbol(walletSymbol: string): TransactionParticipantBuilder {
    this.participant.walletSymbol = walletSymbol
    return this
  }

  setPreviousWalletBalance(prevBalance: number): TransactionParticipantBuilder {
    this.participant.previousWalletBalance = prevBalance
    return this
  }

  setNewWalletBalance(newBalance: number): TransactionParticipantBuilder {
    this.participant.newWalletBalance = newBalance
    return this
  }

  setAmount(amt: number): TransactionParticipantBuilder {
    this.participant.amount = amt
    return this
  }
}