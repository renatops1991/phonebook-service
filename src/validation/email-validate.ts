import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { IValidation } from '@/presentation/protocols/validation'
import { IValidator } from './protocols/validator'

export class EmailValidate implements IValidation {
  constructor (
    private readonly email: string,
    private readonly validator: IValidator
  ) { }

  validate (input: any): Error | null {
    if (!input[this.email]) {
      return null
    }
    const isValidEmail = this.validator.isValidEmail(input[this.email])
    if (!isValidEmail) {
      return new InvalidParamError('email').serializeErrors()
    }

    return null
  }
}
