export enum SettingsEvents {
  CREATE_USER_SETTINGS = 'create_user_settings'
};

export enum TradingEvents {
  SEND_COIN_REQUESTED = 'send_coin_requested',
  BUY_COIN_REQUESTED = 'buy_coin_requested',
  SELL_COIN_REQUESTED = 'sell_coin_requested',
  SWAP_COIN_REQUESTED = 'swap_coin_requested',
  CONVERSION_SUCCESS = 'conversion_success',
  CONVERSION_FAILURE = 'conversion_failure',
  DEDUCTION_SUCCESS = 'deduction_success',
  DEDUCTION_FAILURE = 'deduction_failure',
  TOPUP_SUCCESS = 'topup_success',
  TOPUP_FAILURE = 'topup_failure',
  REVERSAL_SUCCESS = 'reversal_success',
  REVERSAL_FAILURE = 'reversal_failure',
  TRANSACTION_SAVE_SUCCESS = 'txn_save_success',
  TRANSACTION_SAVE_FAILURE = 'txn_save_failure'
}

export enum WalletEvents {
  CREATE_WALLET_FOR_USER = 'create_Wallet_for_user'
}

export enum AuthEvents {
  NEW_ACCOUNT_CREATED = 'new_account_created'
}