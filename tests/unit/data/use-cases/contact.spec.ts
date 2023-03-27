import { Contact } from '@/data/use-cases/contact'
import { fixtureContact, fixtureContactOutput, fixtureFilterContact } from '@/tests/fixtures/fixturesContact'
import { mockContactBuilderStub, mockContactRepositoryStub } from '@/tests/mocks/mock-contact'

const contactRepositoryStub = mockContactRepositoryStub()
const contactBuilderStub = mockContactBuilderStub()
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
})
