import { ErrorTypeEnum } from '../enum/error-type-enum'
import { SerializeErrorType } from '../types/serialize-error-type'
import { CustomError } from './custom-error'

export class EmailInUseError extends CustomError {
  constructor () {
    super('The received email is already in use')
    Object.setPrototypeOf(this, EmailInUseError.prototype)
  }

  serializeErrors (): SerializeErrorType {
    return {
      type: ErrorTypeEnum.EMAIL_IS_ALREADY_USE,
      message: 'The received email is already in use'
    }
  }
}
