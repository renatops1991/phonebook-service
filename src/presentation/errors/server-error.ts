import { ErrorTypeEnum } from '../enum/error-type-enum'
import { SerializeErrorType } from '../types/serialize-error-type'
import { CustomError } from './custom-error'

export class ServerError extends CustomError {
  constructor (public stack: string) {
    super(stack)
    Object.setPrototypeOf(this, ServerError.prototype)
  }

  serializeErrors (): SerializeErrorType {
    return {
      type: ErrorTypeEnum.SERVER_ERROR,
      message: 'Internal Server Error',
      stack: this.stack
    }
  }
}
