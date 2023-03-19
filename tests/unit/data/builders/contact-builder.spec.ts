import { ContactBuilder } from '@/data/builders/contact-builder'
import { Contact } from '@/domain/entities/contact'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'

const fixtureContactDto: CreateContactDto = {
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
}

describe('ContactBuilder', () => {
  describe('buildContact Method', () => {
    it('Should build contact correctly', () => {
      const sut = new ContactBuilder()
      const expectedResponse: Contact = {
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
      }
      expect(sut.buildContact(fixtureContactDto)).toEqual(expectedResponse)
    })
  })
})
