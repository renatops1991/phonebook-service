import { InvalidFilterError } from '@/presentation/errors/invalid-filter-error'
import { IValidation } from '@/presentation/protocols/validation'

export class FilterValidate implements IValidation {
  constructor (
    private readonly fieldAllowedInTheFilter: string[]
  ) { }

  validate (input: any): Error | null {
    for (const fieldKey in input) {
      if (!this.fieldAllowedInTheFilter.includes(fieldKey)) {
        return new InvalidFilterError().serializeErrors()
      }
    }
    return null
  }
}
