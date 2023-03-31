import { Contact } from '@/domain/entities/contact'
import { CreateContactDto, UpdateContactDto } from '@/main/dtos'
import { UpdateContactOutputDto } from '@/main/dtos/update-contact-output.dto'

export interface IContactBuilder {
  buildContact: (contactDto: CreateContactDto) => Contact
  buildUpdateContact: (updateContactDto: UpdateContactDto) => UpdateContactOutputDto
}
