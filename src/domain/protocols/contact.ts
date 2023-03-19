import { ContactOutputDto } from '@/main/dtos/contact-output.dto'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'

export interface IContact {
  create: (contactDto: CreateContactDto) => Promise<ContactOutputDto>
}
