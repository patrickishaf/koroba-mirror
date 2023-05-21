import { EventEmitter } from 'events'
import { AuthEvents, WalletEvents } from '../core/events';
import { createDefaultWalletsForUser, createSingleWalletForUser } from './walletService';

const walletEventListener = new EventEmitter();

walletEventListener.on(AuthEvents.NEW_ACCOUNT_CREATED, createDefaultWalletsForUser);

walletEventListener.on(WalletEvents.CREATE_WALLET_FOR_USER, createSingleWalletForUser);

export default walletEventListener;