import { Address } from './address'

export class Contact {
  id?: string
  name: string
  email: string
  address: Address
  phones: string[]
}
