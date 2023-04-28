import { ErrorResponse, ResponseHandler, SuccessResponse } from "../net";

const tradingResponseHandler: ResponseHandler = {
  handleResponse(res: any) {
    if (res.data.Response === 'Error') {
      return new ErrorResponse(res.data.Message)
    }
    return (res.status === 200) ? new SuccessResponse(res.data) : new ErrorResponse(res.data);
  }
}

export default tradingResponseHandler;