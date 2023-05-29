import { Transaction, TransactionParticipant, TransactionType } from "./models";

export class TransactionParticipantBuilder {
  data: TransactionParticipant

  constructor() {
    this.data = {
      userId: '',
      walletSymbol: '',
      previousWalletBalance: 0,
      newWalletBalance: 0,
      amount: 0
    }
  }

  build(): TransactionParticipant {
    return this.data as TransactionParticipant
  }

  setUserId(userId: string): TransactionParticipantBuilder {
    this.data.userId = userId
    return this
  }

  setWalletSymbol(walletSymbol: string): TransactionParticipantBuilder {
    this.data.walletSymbol = walletSymbol
    return this
  }

  setPreviousWalletBalance(prevBalance: number): TransactionParticipantBuilder {
    this.data.previousWalletBalance = prevBalance
    return this
  }

  setNewWalletBalance(newBalance: number): TransactionParticipantBuilder {
    this.data.newWalletBalance = newBalance
    return this
  }

  setAmount(amt: number): TransactionParticipantBuilder {
    this.data.amount = amt
    return this
  }
}

export class TransactionBuilder {
  txn: Transaction

  constructor() {
    this.txn = {
      timestamp: 0,
      type: null,
      fromDetails: null,
      toDetails: null,
    }
  }

  build(): Transaction {
    return this.txn
  }

  setTimeStamp(timestamp = Date.now()): TransactionBuilder {
    this.txn.timestamp = timestamp
    return this
  }
  
  setType(type: TransactionType): TransactionBuilder {
    this.txn.type = type
    return this
  }

  setFromDetails(from: TransactionParticipant): TransactionBuilder {
    this.txn.fromDetails = from
    return this
  }

  setToDetails(to: TransactionParticipant): TransactionBuilder {
    this.txn.toDetails = to
    return this
  }
}