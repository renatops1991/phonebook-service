import { UpdateContactDto } from '@/main/dtos'
import { IController } from '../protocols/controller'
import { HttpResponseType } from '../types/http-response-type'
import { IContact } from '@/domain/protocols/contact'
import { badRequest, notFound, serverError, success } from '../helpers/http-protocols-helper'
import { IValidation } from '../protocols/validation'
import { NotFoundError } from '../errors/not-found-error'
import { MissingMandatoryParamError } from '../errors/missing-mandatory-param-error'

export class UpdateContact implements IController {
  constructor (
    private readonly contact: IContact,
    private readonly validation: IValidation
  ) { }

  async handle (updateContactDto: UpdateContactDto): Promise<HttpResponseType> {
    try {
      const hasError = this.validation.validate(updateContactDto)
      if (hasError) {
        return badRequest(hasError)
      }

      if (!updateContactDto.email) {
        return badRequest(new MissingMandatoryParamError('email').serializeErrors())
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
