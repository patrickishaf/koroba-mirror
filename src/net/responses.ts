export class SuccessResponse {
  data: any;

  constructor(data: any) {
    this.data = data;
  }
}

export class ErrorResponse {
  message: string;

  constructor(message: string) {
    this.message = message
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