import { SuccessOrError, SuccessResponse } from "./responses";

type HandleFunc = (res: any) => SuccessOrError

interface ResponseHandler {
  handleResponse: HandleFunc
}

export const PrimaryResponseHandler: ResponseHandler = {
  handleResponse(res: any) {
    return new SuccessResponse({});
  }
}

export default ResponseHandler;