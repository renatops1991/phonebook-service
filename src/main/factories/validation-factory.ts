import { ValidatorAdapter } from '@/infra/validators/validator-adapter'
import { IValidation } from '@/presentation/protocols/validation'
import { EmailValidate } from '@/validation/email-validate'
import { PhoneNumberValidate } from '@/validation/phone-number-validate'
import { RequiredField } from '@/validation/required-field'
import { FilterValidate } from '@/validation/filter-validate'
import { ValidationComposite } from '@/validation/validation-composite'

export const makeCreateValidationFactory = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['name', 'email', 'address', 'phones']) {
    validations.push(new RequiredField(field))
  }

  validations.push(
    new EmailValidate('email', new ValidatorAdapter())
  )

  validations.push(
    new PhoneNumberValidate('phones', new ValidatorAdapter())
  )

  return new ValidationComposite(validations)
}

export const makeFetchValidationFactory = (): ValidationComposite => {
  const validations: IValidation[] = []

  validations.push(new FilterValidate(['name', 'email', 'phone', 'postcode', 'address']))

  return new ValidationComposite(validations)
}

export const makeUpdateValidationFactory = (): ValidationComposite => {
  const validations: IValidation[] = []

  validations.push(
    new PhoneNumberValidate('phones', new ValidatorAdapter())
  )

  return new ValidationComposite(validations)
}

export const makeDeleteValidationFactory = (): ValidationComposite => {
  const validations: IValidation[] = []

  validations.push(
    new EmailValidate('email', new ValidatorAdapter())
  )

  return new ValidationComposite(validations)
}
