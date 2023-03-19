import { MongoHelper } from '@/infra/mongodb/mongo-helper'
import dotenv from 'dotenv'

dotenv.config()
describe('MongoHelper', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGODB_URI as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  it('Should correctly connect MongoDB', () => {
    const contactCollection = MongoHelper.getCollection('contacts')
    expect(contactCollection).toBeTruthy()
  })
})
