import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { IValidation } from '@/presentation/protocols/validation'
import { IValidator } from './protocols/validator'

export class PhoneNumberValidate implements IValidation {
  constructor (
    private readonly phone: string,
    private readonly validator: IValidator
  ) { }

  validate (input: any): Error | null {
    const isValidPhone = this.validator.isValidPhoneNumber(input[this.phone])
    if (!isValidPhone) {
      return new InvalidParamError('phone').serializeErrors()
    }
    return null
  }
}
