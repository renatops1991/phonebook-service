import { Address } from '@/domain/entities/address'
import { Contact } from '@/domain/entities/contact'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { IContactBuilder } from '../protocols/contact-builder'

export class ContactBuilder implements IContactBuilder {
  buildContact (contactDto: CreateContactDto): Contact {
    const contact = new Contact()
    contact.name = contactDto.name
    contact.email = contactDto.email
    contact.phones = contactDto.phones
    contact.address = Address.makeAddress(contactDto.address)
    return contact
  }
}
