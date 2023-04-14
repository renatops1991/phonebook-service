import { MongoHelper } from '@/infra/mongodb/mongo-helper'
import { ContactRepositoryMongoAdapter } from '@/infra/mongodb/contact-repository-mongo-adapter'
import { fixtureContact, fixtureUpdateContact } from '@/tests/unit/fixtures/fixturesContact'
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
    const secondContact = ({ ...fixtureContact(), name: 'xis', email: 'bar@example.com', address: { street: 'xis', postcode: '09201245' } })
    const thirstContact = ({ ...fixtureContact(), name: 'bar', email: 'xis@example.com', phones: ['11946578852'] })
    const fourthContact = ({ ...fixtureContact(), name: 'bar', email: 'xis@example.com', phones: ['11946578852'], isDeleted: true })

    const insertContacts = async (): Promise<any> => {
      return (await contactCollection.insertMany([firstContact, secondContact, thirstContact, fourthContact])).insertedIds
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

    it('Should return all contact correctly if isDeleted property is different true', async () => {
      const insertContact = await insertContacts()
      const firstFetchContact = await contact(insertContact[0])
      const secondFetchContact = await contact(insertContact[1])
      const thirstFetchContact = await contact(insertContact[2])
      const expectResponse = await sut.fetchContacts({})
      expect(expectResponse).toEqual([firstFetchContact, secondFetchContact, thirstFetchContact])
    })

    it('Should return all contacts with email provided by param', async () => {
      const insertContact = await insertContacts()
      const thirstFetchContact = await contact(insertContact[2])
      const expectResponse = await sut.fetchContacts({ email: 'xis@example.com' })
      expect(expectResponse).toEqual([thirstFetchContact])
    })

    it('Should return all contacts with phone provided by param', async () => {
      const insertContact = await insertContacts()
      const thirstFetchContact = await contact(insertContact[2])
      const expectResponse = await sut.fetchContacts({ phone: '11946578852' })
      expect(expectResponse).toEqual([thirstFetchContact])
    })

    it('Should return all contacts with address provided by param', async () => {
      const insertContact = await insertContacts()
      const firstFetchContact = await contact(insertContact[0])
      const thirstFetchContact = await contact(insertContact[2])
      const expectResponse = await sut.fetchContacts({ address: 'foo' })
      expect(expectResponse).toEqual([firstFetchContact, thirstFetchContact])
    })

    it('Should return all contacts with postcode provided by param', async () => {
      const insertContact = await insertContacts()
      const secondFetchContact = await contact(insertContact[1])
      const expectResponse = await sut.fetchContacts({ postcode: '09201245' })
      expect(expectResponse).toEqual([secondFetchContact])
    })

    it('Should return all contacts with name provided by param', async () => {
      const insertContact = await insertContacts()
      const firstFetchContact = await contact(insertContact[0])
      const expectResponse = await sut.fetchContacts({ name: 'John foo bar' })
      expect(expectResponse).toEqual([firstFetchContact])
    })
  })

  describe('update', () => {
    it('Should update contact and return on succeeds', async () => {
      await contactCollection.insertOne(fixtureContact())
      const expectedResponse = await sut.update('john@foo.com', fixtureUpdateContact())
      expect(expectedResponse).toBeTruthy()
      expect(expectedResponse.name).toEqual('John')
      expect(expectedResponse.phones).toEqual(['1165985563', '1165985562'])
      expect(expectedResponse.address).toEqual(fixtureContact().address)
    })

    it('Should update contact only field provided', async () => {
      await contactCollection.insertOne(fixtureContact())
      const expectedResponse = await sut.update('john@foo.com', { name: 'Foo' })
      expect(expectedResponse).toBeTruthy()
      expect(expectedResponse.name).toEqual('Foo')
      expect(expectedResponse.phones).toEqual(fixtureContact().phones)
      expect(expectedResponse.address).toEqual(fixtureContact().address)
    })
  })

  describe('delete', () => {
    it('Should update contact passed isDeleted property as true', async () => {
      await contactCollection.insertOne(fixtureContact())
      await sut.delete(fixtureContact().email)
      const expectedResponse = await contactCollection.findOne({ email: fixtureContact().email })
      expect(expectedResponse?.isDeleted).toEqual(true)
    })
  })
})
