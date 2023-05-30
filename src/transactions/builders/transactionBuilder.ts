import { Transaction, TransactionParticipant, TransactionType } from '../models'

export default class TransactionBuilder {
  txn: Transaction

  constructor() {
    this.txn = {
      id: '',
      timestamp: 0,
      type: null,
      fromDetails: null,
      toDetails: null,
    }
  }

  build(): Transaction {
    return this.txn
  }

  setId(id: string): TransactionBuilder {
    this.txn.id = id
    return this
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