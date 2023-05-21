const ErrorMessages = {
  unauthorized: 'unauthorized request',
  emailAlreadyInUse: 'this email has already been used',
  nonExistentUser: 'this email does not exist on our servers',
  invalidToken: 'your token is invalid',
  invalidOTP: 'your otp is invalid',
  expiredOTP: 'your otp has expired. Request for a new one',
  noPendingOTP: 'you haven\'t even asked for an otp to begin with',
  OTPStillValid: 'your otp is still valid',
  noAuthHeader: 'no authorization header present',
  invalidAuthHeader: 'yor auth header is invalid',
  insufficientFiat: (fiatSymbol: string, amountUserNeedsToSpend: number, cryptoAmount: number, cryptoSymbol: string) => `you do not have enough ${fiatSymbol}. You need ${amountUserNeedsToSpend}${fiatSymbol} to buy ${cryptoAmount}${cryptoSymbol}`
}

export default ErrorMessages