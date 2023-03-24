import { IContact } from '@/domain/protocols/contact'
import { FilterContactDto } from '@/main/dtos'
import { NotFoundError } from '../errors/not-found-error'
import { badRequest, notFound, serverError, success } from '../helpers/http-protocols-helper'
import { IController } from '../protocols/controller'
import { IValidation } from '../protocols/validation'
import { HttpResponseType } from '../types/http-response-type'

export class FetchContact implements IController {
  constructor (
    private readonly contact: IContact,
    private readonly validation: IValidation
  ) { }

  async handle (filterContactDto: FilterContactDto): Promise<HttpResponseType> {
    try {
      const hasError = this.validation.validate(filterContactDto)
      if (hasError) {
        return badRequest(hasError)
      }

      const contacts = await this.contact.fetchContacts(filterContactDto)
      if (contacts.length < 1) {
        return notFound(new NotFoundError().serializeErrors())
      }

      return success(contacts)
    } catch (error) {
      return serverError(error)
    }
  }
}
