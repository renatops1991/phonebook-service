import { AddressDto } from './address.dto'

export interface CreateContactDto {
  name: string
  email: string
  address: AddressDto
  phones: string[]
}
