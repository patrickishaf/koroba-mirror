import { ErrorResponse, SuccessOrError, SuccessResponse } from "./responses";

type HandleFunc = (res: any) => SuccessOrError

interface ResponseHandler {
  handleResponse: HandleFunc
}

export const PrimaryResponseHandler: ResponseHandler = {
  handleResponse(res: any) {
    return (res.status === 200) ? new SuccessResponse(res.data) : new ErrorResponse(res.data);
  }
}

export default ResponseHandler;