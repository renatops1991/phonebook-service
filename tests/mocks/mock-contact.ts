import { IContactBuilder } from '@/data/protocols/contact-builder'
import { IContactRepository } from '@/data/protocols/contact-repository'
import { Contact } from '@/domain/entities/contact'
import { IContact } from '@/domain/protocols/contact'
import { ContactOutputDto, CreateContactDto, FilterContactDto, UpdateContactDto } from '@/main/dtos'
import { fixtureContact, fixtureContactOutput } from '../fixtures/fixturesContact'

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
