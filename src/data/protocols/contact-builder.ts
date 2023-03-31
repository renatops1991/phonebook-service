import { Contact } from '@/domain/entities/contact'
import { UpdateContact } from '@/domain/entities/update-contact'
import { CreateContactDto, UpdateContactDto } from '@/main/dtos'

export interface IContactBuilder {
  buildContact: (contactDto: CreateContactDto) => Contact
  buildUpdateContact: (updateContactDto: UpdateContactDto) => UpdateContact
}
