import { IContactRepository } from '@/data/protocols/contact-repository'
import { ContactOutputDto } from '@/main/dtos/contact-output.dto'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { MongoHelper } from './mongo-helper'
import { Collection } from 'mongodb'
import { FilterContactDto, UpdateContactDto } from '@/main/dtos'

export class ContactRepositoryMongoAdapter implements IContactRepository {
  private userCollection: Collection

  async create (contactDto: CreateContactDto): Promise<ContactOutputDto> {
    const createContact = await this.fetchContactCollection().insertOne(contactDto)
    const contact = await this.fetchContactCollection().findOne({
      _id: createContact.insertedId
    })
    return MongoHelper.map(contact)
  }

  async hasContact (email: string): Promise<boolean> {
    const contact = await this.fetchContactCollection().findOne({ email })
    return contact !== null
  }

  async fetchContacts (filterContactDto: FilterContactDto): Promise<ContactOutputDto[]> {
    const { name, email, phone, address, postcode } = filterContactDto
    const filter = !(name ?? email ?? phone ?? address ?? postcode)
      ? {}
      : {
          $or: [
            { name },
            { email },
            {
              phones: {
                $elemMatch: {
                  $eq: phone
                }
              }
            },
            {
              'address.street': address
            }, {
              'address.postcode': postcode
            }
          ]
        }
    const contacts = await this.fetchContactCollection().find(
      filter,
      {
        projection: {
          _id: 1,
          name: 1,
          email: 1,
          address: 1,
          phones: 1
        }
      }
    ).toArray()

    return MongoHelper.mapCollection(contacts)
  }

  async update (email: string, updateContactDto: UpdateContactDto): Promise<ContactOutputDto> {
    const contact = await this.fetchContactCollection().findOneAndUpdate(
      {
        email
      },
      {
        $set: updateContactDto
      },
      {
        upsert: true,
        returnDocument: 'after',
        projection: {
          _id: 1,
          name: 1,
          email: 1,
          address: 1,
          phones: 1
        }
      }
    )

    return MongoHelper.map(contact.value)
  }

  private fetchContactCollection (): Collection {
    if (!this.userCollection) {
      this.userCollection = MongoHelper.getCollection('contacts')
    }

    return this.userCollection
  }
}
