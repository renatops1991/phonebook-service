import { ErrorTypeEnum } from '../enum/error-type-enum'
import { CustomError } from './custom-error'

export class InvalidFilterError extends CustomError {
  constructor () {
    super('Invalid filter: please choose between name, email, address, phones or postcode')
    Object.setPrototypeOf(this, InvalidFilterError.prototype)
  }

  serializeErrors (): any {
    return {
      type: ErrorTypeEnum.INVALID_FILTER_ERROR,
      message: 'Invalid filter: please choose between name, email, address, phones or postcode'
    }
  }
}
