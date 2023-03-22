import { ValidatorAdapter } from '@/infra/validators/validator-adapter'
import { IValidation } from '@/presentation/protocols/validation'
import { EmailValidate } from '@/validation/email-validate'
import { PhoneNumberValidate } from '@/validation/phone-number-validate'
import { RequiredField } from '@/validation/required-field'
import { ValidationComposite } from '@/validation/validation-composite'

export const makeValidationFactory = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['name', 'email', 'address', 'phone']) {
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
