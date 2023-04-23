export interface ValidatedSignUpReqBody {
  email: string
  password: string
}

export interface ValidatedLoginReqBody {
  email: string
  password: string
}

export interface ValidatedOTPSubmissionReqBody {
  email?: string,
  otp: number,
}

export interface TemporaryOTPData {
  email: string,
  password: string,
  otp: number,
  isExpired?: boolean,
}