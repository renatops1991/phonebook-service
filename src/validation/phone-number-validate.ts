import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { IValidation } from '@/presentation/protocols/validation'
import { IValidator } from './protocols/validator'

export class PhoneNumberValidate implements IValidation {
  constructor (
    private readonly phones: string,
    private readonly validator: IValidator
  ) { }

  validate (input: any): Error | null {
    if (!input[this.phones]) {
      return null
    }

    const hasValidPhoneNumbers = input[this.phones].map((phone: string) => {
      return this.validator.hasValidPhoneNumber(phone)
    })

    for (const phone of hasValidPhoneNumbers) {
      if (!phone) {
        const positionPhone = hasValidPhoneNumbers.indexOf(phone)
        return new InvalidParamError(`phones: in position ${positionPhone}`).serializeErrors()
      }
    }

    return null
  }
}
