import { ErrorTypeEnum } from '../enum/error-type-enum'
import { SerializeErrorType } from '../types/serialize-error-type'
import { CustomError } from './custom-error'

export class InvalidParamError extends CustomError {
  constructor (public field: string) {
    super(field)
    Object.setPrototypeOf(this, InvalidParamError.prototype)
  }

  serializeErrors (): SerializeErrorType {
    return {
      type: ErrorTypeEnum.INVALID_PARAM_ERROR,
      field: this.field,
      message: 'Invalid param error'
    }
  }
}
