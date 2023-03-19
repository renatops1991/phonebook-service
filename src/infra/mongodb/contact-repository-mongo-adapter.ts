import { IContactRepository } from '@/data/protocols/contact-repository'
import { ContactOutputDto } from '@/main/dtos/contact-output.dto'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { MongoHelper } from './mongo-helper'
import { Collection } from 'mongodb'

export class ContactRepositoryMongoAdapter implements IContactRepository {
  private userCollection: Collection

  async create (contactDto: CreateContactDto): Promise<ContactOutputDto> {
    const createContact = await this.getUserCollection().insertOne(contactDto)
    const contact = await this.getUserCollection().findOne({
      _id: createContact.insertedId
    })
    return MongoHelper.map(contact)
  }

  hasContact: (email: string) => Promise<boolean>

  private getUserCollection (): Collection {
    if (!this.userCollection) {
      this.userCollection = MongoHelper.getCollection('contacts')
    }

    return this.userCollection
  }
}
