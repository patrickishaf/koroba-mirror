export interface DefaultNotificationSettings {
  openTrade?: {
    email?: boolean,
    sms?: boolean,
  },
  canceledTrade?: {
    email?: boolean,
    sms?: boolean,
  },
  releaseTrade?: {
    email?: boolean,
    sms?: boolean,
  },
  disputeTrade?: {
    email?: boolean,
    sms?: boolean,
  },
  tradeStatus?: {
    email?: boolean,
    sms?: boolean,
  },
  createStatus?: {
    email?: boolean,
    sms?: boolean,
  },
  sendCoin?: {
    email?: boolean,
    sms?: boolean,
  },
  receiveCoin?: {
    email?: boolean,
    sms?: boolean,
  },
  transactionPinChange?: {
    email?: boolean,
  },
  deviceChange?: {
    email?: boolean,
  },
}

export interface GeneralSettings {
  primaryCurrency: 'NGN' | 'USD' | 'EUR' | 'GBP',
  kycVerificationStatus: 0 | 1 | 2 | 3, 
}

export interface DefaultUserSettings {
  notificationSettings: DefaultNotificationSettings,
  generalSettings: GeneralSettings
}

export interface UserSettings {
  notificationSettings?: DefaultNotificationSettings,
  generalSettings?: GeneralSettings
}