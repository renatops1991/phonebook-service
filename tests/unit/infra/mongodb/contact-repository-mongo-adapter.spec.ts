import { MongoHelper } from '@/infra/mongodb/mongo-helper'
import { Collection } from 'mongodb'
import dotenv from 'dotenv'
import { ContactRepositoryMongoAdapter } from '@/infra/mongodb/contact-repository-mongo-adapter'

let userCollection: Collection

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

dotenv.config()
describe('ContactRepositoryMongoAdapter', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_URI_TEST as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })
  describe('create', () => {
    it('Should create a new contact and returns on succeeds', async () => {
      const sut = new ContactRepositoryMongoAdapter()
      const expectedResponse = await sut.create(fixtureContact)
      expect(expectedResponse).toBeTruthy()
      expect(expectedResponse.name).toEqual(fixtureContact.name)
      expect(expectedResponse.email).toEqual(fixtureContact.email)
    })
  })
})
