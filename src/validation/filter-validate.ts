import { InvalidFilterError } from '@/presentation/errors/invalid-filter-error'
import { IValidation } from '@/presentation/protocols/validation'

export class FilterValidate implements IValidation {
  constructor (
    private readonly fieldName: string
  ) { }

  validate (input: any): Error | null {
    if (input[this.fieldName]) {
      return new InvalidFilterError().serializeErrors()
    }
    return null
  }
}
