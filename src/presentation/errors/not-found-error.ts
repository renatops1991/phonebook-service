import { ErrorTypeEnum } from '../enum/error-type-enum'
import { SerializeErrorType } from '../types/serialize-error-type'
import { CustomError } from './custom-error'

export class NotFoundError extends CustomError {
  constructor () {
    super('Search not found')
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors (): SerializeErrorType {
    return {
      type: ErrorTypeEnum.NOT_FOUND,
      message: 'Search not found'
    }
  }
}
