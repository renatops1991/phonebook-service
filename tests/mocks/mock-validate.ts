import { IValidator } from '@/validation/protocols/validator'

export const mockValidator = (): IValidator => {
  class ValidatorStub implements IValidator {
    isValidEmail (email: string): boolean {
      return true
    }

    isValidPhoneNumber (phone: string): boolean {
      return true
    }
  }

  return new ValidatorStub()
}
