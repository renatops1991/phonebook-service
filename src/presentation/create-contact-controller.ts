import { IContact } from '@/domain/protocols/contact'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { IController } from './protocols/controller'
import { HttpResponseType } from './types/http-response-type'

export class CreateContactController implements IController {
  constructor (
    private readonly contact: IContact
  ) { }

  async handle (contactDto: CreateContactDto): Promise<HttpResponseType> {
    try {
      await this.contact.create(contactDto)
      throw new Error('Method not implemented')
    } catch (error) {
      return {
        statusCode: 500,
        body: error
      }
    }
  }
}
