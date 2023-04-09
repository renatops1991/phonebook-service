import { ContactBuilder } from '@/data/builders/contact-builder'
import { Contact } from '@/domain/entities/contact'
import { fixtureContact, fixtureUpdateContact } from '@/tests/unit/fixtures/fixturesContact'

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
      expect(sut.buildContact(fixtureContact())).toEqual(expectedResponse)
    })
  })

  describe('buildUpdateContact method', () => {
    it('Should build update contact correctly', () => {
      const sut = new ContactBuilder()
      const updateContactDto = fixtureUpdateContact()
      expect(sut.buildUpdateContact(updateContactDto)).toEqual(fixtureUpdateContact())
    })
  })
})
