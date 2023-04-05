import { UpdateContactDto } from '@/main/dtos'
import { IController } from '../protocols/controller'
import { HttpResponseType } from '../types/http-response-type'
import { IContact } from '@/domain/protocols/contact'
import { serverError } from '../helpers/http-protocols-helper'

export interface UpdateContactController extends UpdateContactDto { email: string }

export class UpdateContact implements IController {
  constructor (
    private readonly contact: IContact
  ) { }

  async handle (updateContactDto: UpdateContactController): Promise<HttpResponseType> {
    try {
      await this.contact.update(updateContactDto.email, updateContactDto)
      return {
        statusCode: 200
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
