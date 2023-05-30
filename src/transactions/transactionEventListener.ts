import { EventEmitter } from 'events'
import { TradingEvents } from '../core/events'
import { createPendingTransaction, saveTransaction } from './transactionControllers'

const transactionEventListener = new EventEmitter()

transactionEventListener.on(TradingEvents.BUY_COIN_REQUESTED, createPendingTransaction)

transactionEventListener.on(TradingEvents.SAVE_TRANSACTION, saveTransaction)

export default transactionEventListener