import { Address } from '@/domain/entities/address'
import { Contact } from '@/domain/entities/contact'
import { UpdateContact } from '@/domain/entities/update-contact'
import { UpdateContactDto } from '@/main/dtos'
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

  buildUpdateContact (updateContactDto: UpdateContactDto): UpdateContact {
    const contact = new UpdateContact()

    if (updateContactDto.name) {
      contact.name = updateContactDto.name
    }

    if (updateContactDto.phones) {
      contact.phones = updateContactDto.phones
    }

    if (updateContactDto.address) {
      contact.address = Address.makeAddress(updateContactDto.address)
    }

    return contact
  }
}
