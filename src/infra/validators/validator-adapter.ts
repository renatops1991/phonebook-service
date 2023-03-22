import { IValidator } from '@/validation/protocols/validator'
import validator from 'validator'

export class ValidatorAdapter implements IValidator {
  isValidPhoneNumber (phone: string): boolean {
    return validator.isMobilePhone(phone, 'pt-BR')
  }

  isValidEmail (email: string): boolean {
    return validator.isEmail(email)
  }
}
