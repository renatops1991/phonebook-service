import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { ContactOutputDto } from '@/main/dtos/contact-output.dto'

export const fixtureContact = (): CreateContactDto => ({
  name: 'John foo bar',
  email: 'john@foo.com',
  address: {
    street: 'foo',
    number: '45',
    postcode: '09452686',
    neighborhood: 'foo',
    complements: 'foo',
    city: 'foo',
    state: 'bar'
  },
  phones: ['1194657882', '11457895642']
})

export const fixtureContactOutput = (): ContactOutputDto => Object.assign({ ...fixtureContact(), id: 'foo' })