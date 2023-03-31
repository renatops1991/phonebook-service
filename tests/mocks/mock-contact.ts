import { IContactBuilder } from '@/data/protocols/contact-builder'
import { IContactRepository } from '@/data/protocols/contact-repository'
import { Contact } from '@/domain/entities/contact'
import { IContact } from '@/domain/protocols/contact'
import { ContactOutputDto, CreateContactDto, FilterContactDto, UpdateContactDto } from '@/main/dtos'
import { UpdateContactOutputDto } from '@/main/dtos/update-contact-output.dto'
import { fixtureContact, fixtureContactOutput, fixtureUpdateContact } from '../fixtures/fixturesContact'

export const mockContactRepositoryStub = (): IContactRepository => {
  class ContactRepositoryStub implements IContactRepository {
    async create (contactDto: CreateContactDto): Promise<ContactOutputDto> {
      return await new Promise(resolve => {
        resolve(fixtureContactOutput())
      })
    }

    async hasContact (email: string): Promise<boolean> {
      return await Promise.resolve(false)
    }

    async fetchContacts (filterContactDto: FilterContactDto): Promise<ContactOutputDto[]> {
      return await new Promise(resolve => {
        resolve([fixtureContactOutput()])
      })
    }

    async update (email: string, updateContactDto: UpdateContactDto): Promise<ContactOutputDto> {
      return await new Promise(resolve => {
        resolve({
          id: 'foo',
          name: 'John',
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
          phones: ['1165985563', '1165985562']
        })
      })
    }
  }

  return new ContactRepositoryStub()
}

export const mockContactBuilderStub = (): IContactBuilder => {
  class ContactBuilderStub implements IContactBuilder {
    buildFetchContact (contactDto: ContactOutputDto): Contact {
      return fixtureContactOutput()
    }

    buildContact (contactDto: CreateContactDto): Contact {
      return fixtureContact()
    }

    buildUpdateContact (updateContactDto: UpdateContactDto): UpdateContactOutputDto {
      return fixtureUpdateContact()
    }
  }

  return new ContactBuilderStub()
}

export const contactUseCaseStub = (): IContact => {
  class ContactStub implements IContact {
    async fetchContacts (filterContactDto: FilterContactDto): Promise<ContactOutputDto[]> {
      return await new Promise(resolve => { resolve([fixtureContactOutput()]) })
    }

    async create (contactDto: CreateContactDto): Promise<ContactOutputDto | null> {
      return await new Promise(resolve => { resolve(fixtureContactOutput()) })
    }

    update: (email: string, updateContactDto: UpdateContactDto) => Promise<ContactOutputDto>
  }

  return new ContactStub()
}
