import { UpdateContactDto } from '@/main/dtos'
import { IController } from '../protocols/controller'
import { HttpResponseType } from '../types/http-response-type'
import { IContact } from '@/domain/protocols/contact'
import { badRequest, notFound, serverError, success } from '../helpers/http-protocols-helper'
import { IValidation } from '../protocols/validation'
import { NotFoundError } from '../errors/not-found-error'

export interface UpdateContactController extends UpdateContactDto { email: string }

export class UpdateContact implements IController {
  constructor (
    private readonly contact: IContact,
    private readonly validation: IValidation
  ) { }

  async handle (updateContactDto: UpdateContactController): Promise<HttpResponseType> {
    try {
      const hasError = this.validation.validate(updateContactDto)
      if (hasError) {
        return badRequest(hasError)
      }

      const contactUpdated = await this.contact.update(updateContactDto.email, updateContactDto)

      if (!contactUpdated) {
        return notFound(new NotFoundError().serializeErrors())
      }

      return success(contactUpdated)
    } catch (error) {
      return serverError(error)
    }
  }
}
