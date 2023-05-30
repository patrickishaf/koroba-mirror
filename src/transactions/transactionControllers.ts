import { TransactionModel } from '../db/models'
import { Transaction } from './models'

export const createPendingTransaction = () => {}

export const completePendingTransaction = () => {}

export const rejectPendingTransaction = () => {}

export const saveTransaction = async (transaction: Transaction) => {
  try {
    const txnDocument = new TransactionModel(transaction)
    return await txnDocument.save()
  } catch (e) {
    const err = e as Error
    throw new Error(err.message)
  }
}

export const notifyUser = () => {}

export const sendEmailToUser = () => {}