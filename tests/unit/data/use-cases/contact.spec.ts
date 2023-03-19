import { IContactBuilder } from '@/data/protocols/contact-builder'
import { IContactRepository } from '@/data/protocols/contact-repository'
import { Contact } from '@/data/use-cases/contact'
import { Contact as ContactEntity } from '@/domain/entities/contact'
import { ContactOutputDto } from '@/main/dtos/contact-output.dto'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { fixtureContact, fixtureContactOutput } from '@/tests/fixtures/fixturesContact'

class ContactRepositoryStub implements IContactRepository {
  async create (contactDto: CreateContactDto): Promise<ContactOutputDto> {
    return await new Promise(resolve => {
      resolve(fixtureContactOutput())
    })
  }

  async hasContact (email: string): Promise<boolean> {
    return await Promise.resolve(false)
  }
}

class ContactBuilderStub implements IContactBuilder {
  buildContact (contactDto: CreateContactDto): ContactEntity {
    return fixtureContact()
  }
}

const contactRepositoryStub = new ContactRepositoryStub()
const contactBuilderStub = new ContactBuilderStub()
const sut = new Contact(contactRepositoryStub, contactBuilderStub)

describe('Contact UseCase', () => {
  describe('Create Method', () => {
    it('Should call buildContact method of ContactBuilder class with correct values ', async () => {
      const buildContactSpy = jest.spyOn(contactBuilderStub, 'buildContact')
      await sut.create(fixtureContact())
      expect(buildContactSpy).toHaveBeenCalledWith(fixtureContact())
    })

    it('Should call hasContact method of repository with correct values ', async () => {
      const hasContactSpy = jest.spyOn(contactRepositoryStub, 'hasContact')
      await sut.create(fixtureContact())
      expect(hasContactSpy).toHaveBeenCalledWith(fixtureContact().email)
    })
    it('Should call create method of repository with correct values ', async () => {
      const createSpy = jest.spyOn(contactRepositoryStub, 'create')
      await sut.create(fixtureContact())
      expect(createSpy).toHaveBeenCalledWith(fixtureContact())
    })

    it('Should return contact on success', async () => {
      const expectResponse = await sut.create(fixtureContact())
      expect(expectResponse).toEqual(fixtureContactOutput())
    })

    it('Should return null if hasContact method returns true', async () => {
      jest
        .spyOn(contactRepositoryStub, 'hasContact')
        .mockReturnValue(new Promise(resolve => { resolve(true) }))
      await sut.create(fixtureContact())
      const expectedResponse = await sut.create(fixtureContact())
      expect(expectedResponse).toBeNull()
    })
  })
})
