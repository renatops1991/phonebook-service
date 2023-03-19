import { Contact } from '@/domain/entities/contact'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'

export interface IContactBuilder {
  buildContact: (contactDto: CreateContactDto) => Contact
}
