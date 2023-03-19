import { MongoHelper } from '@/infra/mongodb/mongo-helper'
import { ContactRepositoryMongoAdapter } from '@/infra/mongodb/contact-repository-mongo-adapter'
import { fixtureContact } from '@/tests/fixtures/fixturesContact'
import { Collection } from 'mongodb'
import dotenv from 'dotenv'

let contactCollection: Collection

const sut = new ContactRepositoryMongoAdapter()

dotenv.config()
describe('ContactRepositoryMongoAdapter', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_URI_TEST as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    contactCollection = MongoHelper.getCollection('users')
    await contactCollection.deleteMany({})
  })
  describe('create', () => {
    it('Should create a new contact and returns on succeeds', async () => {
      const expectedResponse = await sut.create(fixtureContact())
      expect(expectedResponse).toBeTruthy()
      expect(expectedResponse.name).toEqual(fixtureContact().name)
      expect(expectedResponse.email).toEqual(fixtureContact().email)
    })
  })

  describe('hasContact', () => {
    it('Should return true if contacts exists', async () => {
      await contactCollection.insertOne(fixtureContact())
      const expectedResponse = await sut.hasContact(fixtureContact().email)
      expect(expectedResponse).toBeTruthy()
    })
    it('Should return false if contacts exists', async () => {
      const expectedResponse = await sut.hasContact('foo@example.com')
      expect(expectedResponse).toBeFalsy()
    })
  })
})
