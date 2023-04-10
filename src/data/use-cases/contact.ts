import { IContact } from '@/domain/protocols/contact'
import { FilterContactDto, UpdateContactDto } from '@/main/dtos'
import { ContactOutputDto } from '@/main/dtos/contact-output.dto'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { IContactBuilder } from '../protocols/contact-builder'
import { IContactRepository } from '../protocols/contact-repository'
import { IHttpRequest } from '../protocols/http-request'
export class Contact implements IContact {
  constructor (
    private readonly contactRepository: IContactRepository,
    private readonly contactBuilder: IContactBuilder,
    private readonly httpRequest: IHttpRequest
  ) { }

  async create (contactDto: CreateContactDto): Promise<ContactOutputDto | null> {
    const hasContact = await this.contactRepository.hasContact(contactDto.email)
    if (hasContact) {
      return null
    }
    const buildedContact = this.contactBuilder?.buildContact(contactDto) as CreateContactDto
    const contact = await this.contactRepository.create(buildedContact)
    return contact
  }

  async fetchContacts (filterContactDto: FilterContactDto): Promise<ContactOutputDto[]> {
    await this.httpRequest.read(`https://api.hgbrasil.com/weather?key=${process.env.HG_BRASIL_KEY}&city_name=Santo André, SP`)
    return await this.contactRepository.fetchContacts(filterContactDto)
  }

  async update (email: string, updateContactDto: UpdateContactDto): Promise<ContactOutputDto | null> {
    const hasContact = await this.contactRepository.hasContact(email)

    if (!hasContact) {
      return null
    }

    const buildUpdateContact = this.contactBuilder.buildUpdateContact(updateContactDto)

    return await this.contactRepository.update(email, buildUpdateContact)
  }
}
