export type HttpResponseType<T = any> = {
  status: number
  headers: Record<string, string | number | boolean>
  data?: T
}

export type HttpHeaderType = Record<string, string | number | boolean>
