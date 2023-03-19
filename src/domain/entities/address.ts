import { AddressDto } from '@/main/dtos/address.dto'

export class Address {
  street: string
  number: string
  postcode: string
  neighborhood?: string
  complements?: string
  city: string
  state: string

  static makeAddress (addressDto: AddressDto): Address {
    const address = new Address()
    address.street = addressDto.street
    address.number = addressDto.number
    address.postcode = addressDto.postcode
    if (addressDto.neighborhood) {
      address.neighborhood = addressDto.neighborhood
    }
    if (addressDto.complements) {
      address.complements = addressDto.complements
    }
    address.city = addressDto.city
    address.state = addressDto.state

    return address
  }
}
