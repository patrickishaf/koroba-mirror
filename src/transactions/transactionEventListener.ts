import { EventEmitter } from 'events'
import { TradingEvents } from '../core/events'
import { createPendingTransaction } from './transactionControllers'

const transactionEventListener = new EventEmitter()

transactionEventListener.on(TradingEvents.BUY_COIN_REQUESTED, createPendingTransaction)

export default transactionEventListener