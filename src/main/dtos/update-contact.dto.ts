import { AddressDto } from './address.dto'

export interface UpdateContactDto {
  email?: string
  name?: string
  phones?: string[]
  address?: AddressDto
}
