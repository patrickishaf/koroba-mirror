export const defaultNotificationSettings = {
  openTrade: {
    email: true,
    sms: false,
  },
  canceledTrade: {
    email: true,
    sms: false,
  },
  releaseTrade: {
    email: true,
    sms: false,
  },
  disputeTrade: {
    email: true,
    sms: false,
  },
  tradeStatus: {
    email: true,
    sms: false,
  },
  createStatus: {
    email: true,
    sms: false,
  },
  sendCoin: {
    email: true,
    sms: false,
  },
  receiveCoin: {
    email: true,
    sms: false,
  },
  transactionPinChange: {
    email: true,
  },
  deviceChange: {
    email: true,
  },
}

export const generalSettings = {
  primaryCurrency: 'USD',
  kycVerificationStatus: 0
}

export const defaultUserSettings = {
  notificationSettings: defaultNotificationSettings,
  generalSettings,
}