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

const fixtureContactOutput = Object.assign({ ...fixtureContact, id: 'foo' })

class ContactRepositoryStub implements IContactRepository {
  async create (contactDto: CreateContactDto): Promise<ContactOutputDto> {
    return await new Promise(resolve => {
      resolve(fixtureContactOutput)
    })
  }

  async hasContact (email: string): Promise<boolean> {
    return await Promise.resolve(false)
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
      await sut.create(fixtureContact)
      expect(buildContactSpy).toHaveBeenCalledWith(fixtureContact)
    })
    it('Should call create method of repository with correct values ', async () => {
      const sut = new Contact(contactRepositoryStub, contactBuilderStub)
      const createSpy = jest.spyOn(contactRepositoryStub, 'create')
      await sut.create(fixtureContact)
      expect(createSpy).toHaveBeenCalledWith(fixtureContact)
    })
    it('Should call loadByEmail method of repository with correct values ', async () => {
      const sut = new Contact(contactRepositoryStub, contactBuilderStub)
      const hasContactSpy = jest.spyOn(contactRepositoryStub, 'hasContact')
      await sut.create(fixtureContact)
      expect(hasContactSpy).toHaveBeenCalledWith(fixtureContact.email)
    })
    it('Should return null if loadByEmail method returns true', async () => {
      const sut = new Contact(contactRepositoryStub, contactBuilderStub)
      jest
        .spyOn(contactRepositoryStub, 'hasContact')
        .mockReturnValue(Promise.resolve(true))
      await sut.create(fixtureContact)
      const expectedResponse = await sut.create(fixtureContact)
      expect(expectedResponse).toBeNull()
    })
    it('Should return contact on success', async () => {
      const sut = new Contact(contactRepositoryStub, contactBuilderStub)
      const expectResponse = await sut.create(fixtureContact)
      expect(expectResponse).toEqual(fixtureContactOutput)
    })
  })
})
