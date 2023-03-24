import { ServerError } from '../errors/server-error'
import { HttpResponseType } from '../types/http-response-type'

export const created = <T =any>(data: T): HttpResponseType => ({
  statusCode: 201,
  body: data
})

export const noContent = (): HttpResponseType => ({
  statusCode: 204,
  body: null
})

export const success = <T= any>(data: T): HttpResponseType => ({
  statusCode: 200,
  body: data
})

export const badRequest = (error: Error): HttpResponseType => ({
  statusCode: 400,
  body: error
})

export const forbidden = (error: Error): HttpResponseType => ({
  statusCode: 403,
  body: error
})

export const notFound = (error: Error): HttpResponseType => ({
  statusCode: 404,
  body: error
})

export const serverError = (error: Error): HttpResponseType => ({
  statusCode: 500,
  body: new ServerError(error.stack as string).serializeErrors()
})
