import { ContactOutputDto, CreateContactDto, FilterContactDto, UpdateContactDto } from '@/main/dtos'
export interface IContactRepository {
  create: (contactDto: CreateContactDto) => Promise<ContactOutputDto>
  hasContact: (email: string) => Promise<boolean>
  fetchContacts: (filterContactDto: FilterContactDto) => Promise<ContactOutputDto[]>
  update: (email: string, updateContactDto: UpdateContactDto) => Promise<ContactOutputDto>
}
