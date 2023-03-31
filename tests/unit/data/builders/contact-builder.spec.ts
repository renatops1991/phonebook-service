import { ContactBuilder } from '@/data/builders/contact-builder'
import { Contact } from '@/domain/entities/contact'
import { fixtureContact, fixtureContactOutput, fixtureUpdateContact } from '@/tests/fixtures/fixturesContact'

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

    it('Should build fetch contact correctly', () => {
      const sut = new ContactBuilder()
      const contactDto = fixtureContactOutput()
      const expectedResponse: Contact = {
        id: 'foo',
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
      expect(sut.buildFetchContact(contactDto)).toEqual(expectedResponse)
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
