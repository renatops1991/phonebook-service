import { IContactBuilder } from '@/data/protocols/contact-builder'
import { IContactRepository } from '@/data/protocols/contact-repository'
import { Contact } from '@/data/use-cases/contact'
import { Contact as ContactEntity } from '@/domain/entities/contact'
import { ContactOutputDto } from '@/main/dtos/contact-output.dto'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'

const fixtureContact = {
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

class ContactRepositoryStub implements IContactRepository {
  async create (contactDto: CreateContactDto): Promise<ContactOutputDto> {
    return await new Promise(resolve => {
      resolve(Object.assign({ ...fixtureContact, id: 'foo' }))
    })
  }
}

class ContactBuilderStub implements IContactBuilder {
  buildContact (contactDto: CreateContactDto): ContactEntity {
    return fixtureContact
  }
}

const contactRepositoryStub = new ContactRepositoryStub()
const contactBuilderStub = new ContactBuilderStub()

describe('Contact UseCase', () => {
  describe('Create Method', () => {
    it('Should call buildContact method of ContactBuilder class with correct values ', async () => {
      const sut = new Contact(contactRepositoryStub, contactBuilderStub)
      const buildContactSpy = jest.spyOn(contactBuilderStub, 'buildContact')
      const expectResponse = fixtureContact
      await sut.create(fixtureContact)
      expect(buildContactSpy).toHaveBeenCalledWith(expectResponse)
    })
    it('Should call create method of repository with correct values ', async () => {
      const sut = new Contact(contactRepositoryStub, contactBuilderStub)
      const createSpy = jest.spyOn(contactRepositoryStub, 'create')
      const expectResponse = fixtureContact
      await sut.create(fixtureContact)
      expect(createSpy).toHaveBeenCalledWith(expectResponse)
    })
  })
})
