import { ContactOutputDto } from '@/main/dtos/contact-output.dto'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'

export interface IContactRepository {
  create: (contactDto: CreateContactDto) => Promise<ContactOutputDto>
  hasContact: (email: string) => Promise<boolean>
}
