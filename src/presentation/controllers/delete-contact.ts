import { IContact } from '@/domain/protocols/contact'
import { IController } from '../protocols/controller'
import { HttpResponseType } from '../types/http-response-type'
import { IValidation } from '../protocols/validation'
import { badRequest, noContent, serverError } from '../helpers/http-protocols-helper'
import { DeleteContactDto } from '@/main/dtos/delete-contact.dto'

export class DeleteContact implements IController {
  constructor (
    private readonly contact: IContact,
    private readonly validation: IValidation
  ) {}

  async handle (deleteContactDto: DeleteContactDto): Promise<HttpResponseType> {
    try {
      const hasError = this.validation.validate(deleteContactDto.email)
      if (hasError) {
        return badRequest(hasError)
      }

      await this.contact.delete(deleteContactDto.email)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
