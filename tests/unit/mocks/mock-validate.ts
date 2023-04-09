import { IValidation } from '@/presentation/protocols/validation'
import { IValidator } from '@/validation/protocols/validator'

export const mockValidator = (): IValidator => {
  class ValidatorStub implements IValidator {
    isValidEmail (email: string): boolean {
      return true
    }

    hasValidPhoneNumber (phone: string): boolean {
      return true
    }
  }

  return new ValidatorStub()
}

export const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}
