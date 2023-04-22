export class SuccessResponse {
  data: any;

  constructor(data: any) {
    this.data = data;
  }

  resolve(): boolean {
    return true
  }
}

export class ErrorResponse {
  message: string;

  constructor(message: string) {
    this.message = message
  }

  resolve(): boolean {
    return false
  }
}

export class ClientResponse {
  status: 'success' | 'error';
  data?: any;
  error?: any;

  constructor(status, data=null, error=null) {
    this.status = status;
    this.data = data;
    this.error = error;
  }
}

const ERROR_RES_CONSTRUCTOR_NAME = new ErrorResponse('').constructor.name;
const SUCCESS_RES_CONSTRUCTOR_NAME = new SuccessResponse({}).constructor.name;

export type SuccessOrError = SuccessResponse | ErrorResponse;

export const isSuccessResponse = (obj: any) => {
  return obj.constructor.name === SUCCESS_RES_CONSTRUCTOR_NAME;
}

export const isErrorResponse = (obj: any) => {
  return obj.constructor.name === ERROR_RES_CONSTRUCTOR_NAME;
}