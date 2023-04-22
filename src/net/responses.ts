export class SuccessResponse {
  data: any;
  status: string

  constructor(data: any, status="success") {
    this.data = data;
    this.status = status;
  }

  resolve(): boolean {
    return true;
  }
}

export class ErrorResponse {
  message: string;
  status: string;
  code: number;

  constructor(message: string, status='error') {
    this.message = message;
    this.status = status;
  }

  resolve(): boolean {
    return false;
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