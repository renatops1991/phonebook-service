import { IValidator } from '@/validation/protocols/validator'
import validator from 'validator'

export class ValidatorAdapter implements IValidator {
  isValidEmail (email: string): boolean {
    return validator.isEmail(email)
  }
}
