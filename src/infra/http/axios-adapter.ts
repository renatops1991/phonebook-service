import { IHttpRequest } from '@/data/protocols/http-request'
import { HttpConfigType, HttpHeaderType, HttpResponseType } from '@/data/types/http-types'
import axios, { AxiosInstance, AxiosResponse } from 'axios'

export class AxiosAdapter implements IHttpRequest {
  private client: AxiosInstance

  constructor (
    private readonly axiosConfig: HttpConfigType
  ) { }

  async create (url: string, body?: any, headers?: HttpHeaderType | undefined): Promise<HttpResponseType> {
    const response = await this.getConnection().post(url, body, headers)
    return this.makeResponse(response)
  }

  async read (url: string, headers?: HttpHeaderType | undefined): Promise<HttpResponseType> {
    await this.getConnection().get(url, headers)

    return {
      status: 200,
      headers: ''
    }
  }

  update: (url: string, body?: any, headers?: HttpHeaderType | undefined) => Promise<HttpResponseType>
  delete: (url: string, body?: any, headers?: HttpHeaderType | undefined) => Promise<HttpResponseType>
  patch: (url: string, body?: any, headers?: HttpHeaderType | undefined) => Promise<HttpResponseType>

  private getConnection (): AxiosInstance {
    if (!this.client) {
      this.client = axios.create(this.axiosConfig)
    }
    return this.client
  }

  private makeResponse (axiosResponse: AxiosResponse): HttpResponseType {
    return {
      status: axiosResponse.status,
      headers: axiosResponse.headers,
      data: axiosResponse.data
    }
  }
}
