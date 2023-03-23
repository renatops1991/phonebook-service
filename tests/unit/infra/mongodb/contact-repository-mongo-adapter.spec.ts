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
    contactCollection = MongoHelper.getCollection('contacts')
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

  describe('fetchContacts', () => {
    const firstContact = fixtureContact()
    const secondContact = ({ ...fixtureContact(), email: 'bar@example.com' })
    const thirstContact = ({ ...fixtureContact(), email: 'xis@example.com' })

    const insertContacts = async (): Promise<any> => {
      return (await contactCollection.insertMany([firstContact, secondContact, thirstContact])).insertedIds
    }

    const contact = async (id: any): Promise<any> => {
      const contact = await contactCollection.findOne({ _id: id })
      return MongoHelper.map(contact)
    }
    it('Should return all contacts correctly', async () => {
      const insertContact = await insertContacts()
      const firstFetchContact = await contact(insertContact[0])
      const secondFetchContact = await contact(insertContact[1])
      const thirstFetchContact = await contact(insertContact[2])
      const expectResponse = await sut.fetchContacts({})
      expect(expectResponse).toEqual([firstFetchContact, secondFetchContact, thirstFetchContact])
    })
  })
})
