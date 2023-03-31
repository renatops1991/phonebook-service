import { Contact } from '@/data/use-cases/contact'
import { fixtureContact, fixtureContactOutput, fixtureFilterContact, fixtureUpdateContact, fixtureUpdateContactOutput } from '@/tests/fixtures/fixturesContact'
import { mockContactBuilderStub, mockContactRepositoryStub } from '@/tests/mocks/mock-contact'

const contactRepositoryStub = mockContactRepositoryStub()
const contactBuilderStub = mockContactBuilderStub()
const sut = new Contact(contactRepositoryStub, contactBuilderStub)

describe('Contact UseCase', () => {
  describe('Create Method', () => {
    it('Should call buildContact method of ContactBuilder class with correct values', async () => {
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
        .mockReturnValueOnce(new Promise(resolve => { resolve(true) }))
      const expectedResponse = await sut.create(fixtureContact())
      expect(expectedResponse).toBeNull()
    })
  })

  describe('fetchContacts method', () => {
    it('Should call fetch contacts method of the repository with correct values', async () => {
      const fetchContactsSpy = jest
        .spyOn(contactRepositoryStub, 'fetchContacts')
      await sut.fetchContacts(fixtureFilterContact())
      expect(fetchContactsSpy).toHaveBeenCalledWith(fixtureFilterContact())
    })
    it('Should return an contacts array', async () => {
      const expectedResponse = await sut.fetchContacts(fixtureFilterContact())
      expect(expectedResponse).toEqual([fixtureContactOutput()])
    })
  })

  describe('Update method', () => {
    it('Should call hasContact method of repository class with correct values', async () => {
      const hasContactSpy = jest
        .spyOn(contactRepositoryStub, 'hasContact')
      await sut.update('foo@example.com', fixtureUpdateContact())
      expect(hasContactSpy).toHaveBeenCalledWith('foo@example.com')
    })

    it('Should return null if contact return false', async () => {
      jest
        .spyOn(contactRepositoryStub, 'hasContact')
      const expectedResponse = await sut.update('foo@example.com', fixtureUpdateContact())
      expect(expectedResponse).toBeNull()
    })

    it('Should call buildUpdateContact method with correct values', async () => {
      jest
        .spyOn(contactRepositoryStub, 'hasContact')
        .mockReturnValueOnce(new Promise(resolve => { resolve(true) }))
      const buildUpdateContact = jest
        .spyOn(contactBuilderStub, 'buildUpdateContact')
      await sut.update('john@foo.com', fixtureUpdateContact())
      expect(buildUpdateContact).toHaveBeenCalledWith(fixtureUpdateContact())
    })

    it('Should call update method of the repository class with correct values if contact exists', async () => {
      const updateSpy = jest
        .spyOn(contactRepositoryStub, 'update')
      jest
        .spyOn(contactRepositoryStub, 'hasContact')
        .mockReturnValueOnce(new Promise(resolve => { resolve(true) }))
      await sut.update('foo@example.com', fixtureUpdateContact())
      expect(updateSpy).toHaveBeenCalledWith('foo@example.com', fixtureUpdateContact())
    })

    it('Should return updated contact on succeeds', async () => {
      jest
        .spyOn(contactRepositoryStub, 'hasContact')
        .mockReturnValueOnce(new Promise(resolve => { resolve(true) }))
      const expectedResponse = await sut.update('john@foo.com', fixtureUpdateContact())
      expect(expectedResponse).toEqual(fixtureUpdateContactOutput())
    })
  })
})
