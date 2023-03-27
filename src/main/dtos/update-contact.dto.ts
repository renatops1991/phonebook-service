import { AddressDto } from './address.dto'

export interface UpdateContactDto {
  name?: string
  phones?: string[]
  address?: AddressDto
}
