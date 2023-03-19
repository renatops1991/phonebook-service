import { IContact } from '@/domain/protocols/contact'
import { ContactOutputDto } from '@/main/dtos/contact-output.dto'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { IContactBuilder } from '../protocols/contact-builder'
import { IContactRepository } from '../protocols/contact-repository'

export class Contact implements IContact {
  constructor (
    private readonly contactRepository: IContactRepository,
    private readonly contactBuilder?: IContactBuilder
  ) { }

  async create (contactDto: CreateContactDto): Promise<ContactOutputDto> {
    const buildedContact = this.contactBuilder?.buildContact(contactDto) as CreateContactDto
    return await this.contactRepository.create(buildedContact)
  }
}
