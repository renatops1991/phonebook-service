import { Contact } from '@/domain/entities/contact'
import { ContactOutputDto, CreateContactDto, UpdateContactDto } from '@/main/dtos'
import { UpdateContactOutputDto } from '@/main/dtos/update-contact-output.dto'

export interface IContactBuilder {
  buildContact: (contactDto: CreateContactDto) => Contact
  buildFetchContact: (contactDto: ContactOutputDto) => Contact
  buildUpdateContact: (updateContactDto: UpdateContactDto) => UpdateContactOutputDto
}
