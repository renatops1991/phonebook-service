import { HttpHeaderType, HttpResponseType } from '../types/http-types'

export interface IHttpRequest<T = any> {
  create: (url: string, body?: T, headers?: HttpHeaderType) => Promise<HttpResponseType>
  read: (url: string, headers?: HttpHeaderType) => Promise<HttpResponseType>
  update: (url: string, body?: T, headers?: HttpHeaderType) => Promise<HttpResponseType>
  delete: (url: string, body?: T, headers?: HttpHeaderType) => Promise<HttpResponseType>
  patch: (url: string, body?: T, headers?: HttpHeaderType) => Promise<HttpResponseType>
}
