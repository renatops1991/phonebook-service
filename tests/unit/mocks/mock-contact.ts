import { IContactBuilder } from '@/data/protocols/contact-builder'
import { IContactRepository } from '@/data/protocols/contact-repository'
import { Contact } from '@/domain/entities/contact'
import { UpdateContact } from '@/domain/entities/update-contact'
import { IContact } from '@/domain/protocols/contact'
import { ContactOutputDto, CreateContactDto, FilterContactDto, UpdateContactDto } from '@/main/dtos'
import { fixtureContact, fixtureContactOutput, fixtureUpdateContact, fixtureUpdateContactOutput } from '../fixtures/fixturesContact'
import { IHttpRequest } from '@/data/protocols/http-request'
import { HttpHeaderType, HttpResponseType } from '@/data/types/http-types'

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

    async delete (email: string): Promise<void> {
      await Promise.resolve()
    }
  }

  return new ContactRepositoryStub()
}

export const mockContactBuilderStub = (): IContactBuilder => {
  class ContactBuilderStub implements IContactBuilder {
    buildContact (contactDto: CreateContactDto): Contact {
      return fixtureContact()
    }

    buildUpdateContact (updateContactDto: UpdateContactDto): UpdateContact {
      return fixtureUpdateContact() as UpdateContact
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

    async update (email: string, updateContactDto: UpdateContactDto): Promise<ContactOutputDto> {
      return await new Promise(resolve => { resolve(fixtureUpdateContactOutput()) })
    }

    async delete (email: string): Promise<void> {
      await Promise.resolve()
    }
  }

  return new ContactStub()
}

export const mockHttpRequest = (): IHttpRequest => {
  class AxiosAdapterStub implements IHttpRequest {
    create: (url: string, body?: any, headers?: HttpHeaderType) => Promise<HttpResponseType>

    async read (url: string, headers?: HttpHeaderType): Promise<HttpResponseType> {
      return await new Promise(resolve => {
        resolve({
          status: 200,
          headers: '',
          data: {
            results: {
              temp: 15,
              date: new Date('2023-01-01T00:00:00'),
              currently: 'noite',
              description: 'Tempo nublado',
              humidity: 25,
              cloudiness: 25,
              rain: 0
            }
          }
        })
      })
    }

    update: (url: string, body?: any, headers?: HttpHeaderType) => Promise<HttpResponseType>
    delete: (url: string, headers?: HttpHeaderType) => Promise<HttpResponseType>
  }

  return new AxiosAdapterStub()
}
