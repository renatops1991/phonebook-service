import { MissingMandatoryParamError } from '@/presentation/errors/missing-mandatory-param-error'
import { IValidation } from '@/presentation/protocols/validation'

export class RequiredField implements IValidation {
  constructor (
    private readonly fieldName: string
  ) { }

  validate (input: any): Error | null {
    if (!input[this.fieldName]) {
      return new MissingMandatoryParamError(this.fieldName).serializeErrors()
    }
    return null
  }
}
