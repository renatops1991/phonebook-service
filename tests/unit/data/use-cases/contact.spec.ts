import { Contact } from '@/data/use-cases/contact'
import {
  fixtureContact,
  fixtureContactOutput,
  fixtureContactWithWeatherOutput,
  fixtureFilterContact,
  fixtureUpdateContact,
  fixtureUpdateContactOutput
} from '@/tests/unit/fixtures/fixturesContact'
import { mockHttpRequest, mockContactBuilderStub, mockContactRepositoryStub } from '@/tests/unit/mocks/mock-contact'
import MockDate from 'mockdate'
import dotenv from 'dotenv'

dotenv.config()

const contactRepositoryStub = mockContactRepositoryStub()
const contactBuilderStub = mockContactBuilderStub()
const httpRequestStub = mockHttpRequest()
const sut = new Contact(contactRepositoryStub, contactBuilderStub, httpRequestStub)

describe('Contact UseCase', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
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

    it('Should call read method of the axiosAdapter with correct values', async () => {
      const cityName = 'foo,bar'
      const readSpy = jest
        .spyOn(httpRequestStub, 'read')
      jest
        .spyOn(contactRepositoryStub, 'fetchContacts')
      await sut.fetchContacts(fixtureFilterContact())
      expect(readSpy).toHaveBeenCalledWith(`?key=${process.env.HG_BRASIL_KEY}&city_name=${cityName}`)
    })

    it('Should return an contacts array with weather property', async () => {
      jest
        .spyOn(httpRequestStub, 'read')
      const expectedResponse = await sut.fetchContacts(fixtureFilterContact())
      expect(expectedResponse).toStrictEqual([fixtureContactWithWeatherOutput()])
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
