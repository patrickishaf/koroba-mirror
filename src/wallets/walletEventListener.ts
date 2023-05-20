import { EventEmitter } from 'events'
import { AuthEvents } from '../core/events';
import { createDefaultWalletsForUser } from './walletService';

const walletEventListener = new EventEmitter();

walletEventListener.on(AuthEvents.NEW_ACCOUNT_CREATED, createDefaultWalletsForUser)

export default walletEventListener