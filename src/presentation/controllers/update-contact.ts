import { UpdateContactDto } from '@/main/dtos'
import { IController } from '../protocols/controller'
import { HttpResponseType } from '../types/http-response-type'
import { IContact } from '@/domain/protocols/contact'
import { serverError, success } from '../helpers/http-protocols-helper'

export interface UpdateContactController extends UpdateContactDto { email: string }

export class UpdateContact implements IController {
  constructor (
    private readonly contact: IContact
  ) { }

  async handle (updateContactDto: UpdateContactController): Promise<HttpResponseType> {
    try {
      const contactUpdated = await this.contact.update(updateContactDto.email, updateContactDto)
      return success(contactUpdated)
    } catch (error) {
      return serverError(error)
    }
  }
}
