import { Contact } from '@/domain/entities/contact'
import { ContactOutputDto, CreateContactDto } from '@/main/dtos'

export interface IContactBuilder {
  buildContact: (contactDto: CreateContactDto) => Contact
  buildFetchContact: (contactDto: ContactOutputDto) => Contact
}
