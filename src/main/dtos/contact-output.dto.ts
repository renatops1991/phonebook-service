import { CreateContactDto } from './create-contact.dto'

export interface ContactOutputDto extends CreateContactDto {
  id: string
}
