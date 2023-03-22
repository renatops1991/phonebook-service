import { IContact } from '@/domain/protocols/contact'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { EmailInUseError } from '../errors/email-in-use-error'
import { badRequest, created, forbidden, serverError } from '../helpers/http-protocols-helper'
import { IController } from '../protocols/controller'
import { IValidation } from '../protocols/validation'
import { HttpResponseType } from '../types/http-response-type'

export class CreateContact implements IController {
  constructor (
    private readonly contact: IContact,
    private readonly validation: IValidation
  ) { }

  async handle (contactDto: CreateContactDto): Promise<HttpResponseType> {
    try {
      const isError = this.validation.validate(contactDto)
      if (isError) {
        return badRequest(isError)
      }

      const contact = await this.contact.create(contactDto)
      if (!contact) {
        return forbidden(new EmailInUseError().serializeErrors())
      }
      return created(contact)
    } catch (error) {
      return serverError(error)
    }
  }
}
