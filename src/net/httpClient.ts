import { type AxiosInstance } from "axios";
import type ResponseHandler from "./responseHandler";
import { SuccessOrError } from "./responses";
import { PrimaryResponseHandler } from "./responseHandler";
import { primaryHttpInstance } from "./httpInstances";

export default class HttpClient {
  connector: AxiosInstance;
  responseHandler: ResponseHandler;

  constructor(connector: AxiosInstance = primaryHttpInstance, responseHandler: ResponseHandler = PrimaryResponseHandler) {
    this.connector = connector;
    this.responseHandler = responseHandler;
  }

  setConnector(connector: AxiosInstance): HttpClient {
    this.connector = connector;
    return this;
  }

  setResponseHandler(handler: ResponseHandler): HttpClient {
    this.responseHandler = handler;
    return this;
  }

  async get(url: string): Promise<SuccessOrError> {
    const res = await this.connector.get(url);
    return this.responseHandler.handleResponse(res);
  }

  async post(url: string, data: any): Promise<SuccessOrError> {
    const res = await this.connector.post(url, data);
    return this.responseHandler.handleResponse(res);
  }

  async put(url: string, data: any): Promise<SuccessOrError> {
    const res = await this.connector.put(url, data);
    return this.responseHandler.handleResponse(res);
  }

  async delete(url: string, data: any): Promise<SuccessOrError> {
    const res = await this.connector.get(url, data);
    return this.responseHandler.handleResponse(res);
  }
}