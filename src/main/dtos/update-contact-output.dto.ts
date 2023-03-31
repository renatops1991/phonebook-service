import { AddressDto } from './address.dto'

export interface UpdateContactOutputDto {
  name?: string
  phones?: string[]
  address?: AddressDto
}
