export type HttpResponseType<T = any> = {
  status: number
  headers: T
  data?: T | undefined
}

export type HttpHeaderType = Record<string, string | number | boolean>

export type HttpConfigType = {
  baseURL: string
  serviceName?: string
  headers?: HttpHeaderType
  timeout?: number
  ApiKey?: string
}
