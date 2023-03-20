import { IContact } from '@/domain/protocols/contact'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { IController } from '../protocols/controller'
import { HttpResponseType } from '../types/http-response-type'

export class CreateContactController implements IController {
  constructor (
    private readonly contact: IContact
  ) { }

  async handle (contactDto: CreateContactDto): Promise<HttpResponseType> {
    try {
      const contact = await this.contact.create(contactDto)
      if (!contact) {
        return {
          statusCode: 403,
          body: new Error('The received email is already in use')
        }
      }

      return {
        statusCode: 201,
        body: contact
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error('Internal server error')
      }
    }
  }
}
