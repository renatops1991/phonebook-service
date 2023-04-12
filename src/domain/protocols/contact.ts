import {
  FilterContactDto,
  ContactOutputDto,
  CreateContactDto,
  UpdateContactDto
} from '@/main/dtos'

export interface IContact {
  create: (contactDto: CreateContactDto) => Promise<ContactOutputDto | null>
  fetchContacts: (filterContactDto: FilterContactDto) => Promise<ContactOutputDto[]>
  update: (email: string, updateContactDto: UpdateContactDto) => Promise<ContactOutputDto | null>
  delete: (id: string) => Promise<void>
}
