import { HttpResponseType } from '../types/http-response-type'

export interface IController<T= any> {
  handle: (request: T) => Promise<HttpResponseType>
}
