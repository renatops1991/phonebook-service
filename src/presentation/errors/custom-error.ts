import { ErrorTypeEnum } from '../enum/error-type-enum'

export abstract class CustomError extends Error {
  stack?: string
  constructor (message: string) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors (): {
    type: ErrorTypeEnum
    field?: string
    message: string
    stack?: any
  }
}
