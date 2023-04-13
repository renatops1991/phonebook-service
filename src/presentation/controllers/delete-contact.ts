import { IContact } from '@/domain/protocols/contact'
import { IController } from '../protocols/controller'
import { HttpResponseType } from '../types/http-response-type'
import { IValidation } from '../protocols/validation'
import { badRequest, serverError } from '../helpers/http-protocols-helper'

export class DeleteContact implements IController {
  constructor (
    private readonly contact: IContact,
    private readonly validation: IValidation
  ) {}

  async handle (email: string): Promise<HttpResponseType> {
    try {
      const hasError = this.validation.validate(email)
      if (hasError) {
        return badRequest(hasError)
      }

      await this.contact.delete(email)
      return {
        statusCode: 200
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
