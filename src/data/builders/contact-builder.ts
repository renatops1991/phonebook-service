import { Address } from '@/domain/entities/address'
import { Contact } from '@/domain/entities/contact'
import { ContactOutputDto, UpdateContactDto } from '@/main/dtos'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { UpdateContactOutputDto } from '@/main/dtos/update-contact-output.dto'
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

  buildFetchContact (contactDto: ContactOutputDto): Contact {
    const contact = new Contact()
    contact.id = contactDto.id
    contact.name = contactDto.name
    contact.email = contactDto.email
    contact.phones = contactDto.phones
    contact.address = Address.makeAddress(contactDto.address)
    return contact
  }

  buildUpdateContact (updateContactDto: UpdateContactDto): UpdateContactOutputDto {
    const contact = new Contact()

    if (updateContactDto.name) {
      contact.name = updateContactDto.name
    }

    if (updateContactDto.phones) {
      contact.phones = updateContactDto.phones
    }

    if (updateContactDto.address) {
      contact.address = Address.makeAddress(updateContactDto.address)
    }

    return contact as UpdateContactOutputDto
  }
}
