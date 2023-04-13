import { IContact } from '@/domain/protocols/contact'
import { IController } from '../protocols/controller'
import { HttpResponseType } from '../types/http-response-type'
import { IValidation } from '../protocols/validation'

export class DeleteContact implements IController {
  constructor (
    private readonly contact: IContact,
    private readonly validation: IValidation
  ) {}

  async handle (email: string): Promise<HttpResponseType> {
    this.validation.validate(email)
    await this.contact.delete(email)
    return {
      statusCode: 200
    }
  }
}
