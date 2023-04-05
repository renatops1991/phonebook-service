import { UpdateContactDto } from '@/main/dtos'
import { IController } from '../protocols/controller'
import { HttpResponseType } from '../types/http-response-type'
import { IContact } from '@/domain/protocols/contact'

export interface UpdateContactController extends UpdateContactDto { email: string }

export class UpdateContact implements IController {
  constructor (
    private readonly contact: IContact
  ) { }

  async handle (updateContactDto: UpdateContactController): Promise<HttpResponseType> {
    await this.contact.update(updateContactDto.email, updateContactDto)
    return {
      statusCode: 200
    }
  }
}
