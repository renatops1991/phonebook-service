import { ErrorTypeEnum } from '../enum/error-type-enum'
import { CustomError } from './custom-error'

export class MissingMandatoryParamError extends CustomError {
  constructor (public field: string) {
    super(field)
    Object.setPrototypeOf(this, MissingMandatoryParamError.prototype)
  }

  serializeErrors (): any {
    return {
      type: ErrorTypeEnum.MISSING_MANDATORY_PARAM_ERROR,
      field: this.field,
      message: 'Missing mandatory parameter'
    }
  }
}
