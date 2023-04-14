import { IContact } from '@/domain/protocols/contact'
import { FilterContactDto, UpdateContactDto } from '@/main/dtos'
import { ContactOutputDto } from '@/main/dtos/contact-output.dto'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { IContactBuilder } from '../protocols/contact-builder'
import { IContactRepository } from '../protocols/contact-repository'
import { IHttpRequest } from '../protocols/http-request'
import * as utils from '@/main/utils'
export class Contact implements IContact {
  constructor (
    private readonly contactRepository: IContactRepository,
    private readonly contactBuilder: IContactBuilder,
    private readonly httpRequest: IHttpRequest
  ) { }

  async create (contactDto: CreateContactDto): Promise<ContactOutputDto | null> {
    const hasContact = await this.contactRepository.hasContact(contactDto.email)
    if (hasContact) {
      return null
    }
    const buildedContact = this.contactBuilder.buildContact(contactDto) as CreateContactDto
    const contact = await this.contactRepository.create(buildedContact)
    return contact
  }

  async fetchContacts (filterContactDto: FilterContactDto): Promise<ContactOutputDto[]> {
    const contactsWithWeather: ContactOutputDto[] = []
    const contacts = await this.contactRepository.fetchContacts(filterContactDto)

    for (const contact of contacts) {
      const weather = await this.httpRequest.read(`?key=${process.env.HG_BRASIL_KEY}&city_name=${contact.address.city},${contact.address.state}`)
      const temperature = weather.data.results?.temp
      const condition = weather.data.results?.condition_code

      contactsWithWeather.push({
        ...contact,
        description: utils.makeDescriptionWeatherByTemperature(temperature, condition),
        weather: {
          temperature: temperature ?? null,
          date: weather.data.results.date ? weather.data.results.date : new Date(),
          currently: weather.data.results?.currently ?? null,
          description: weather.data.results?.description ?? null,
          humidity: weather.data.results?.humidity ?? null,
          cloudiness: weather.data.results?.cloudiness ?? null,
          rain: weather.data.results?.rain ?? null
        }
      })
    }

    return contactsWithWeather
  }

  async update (email: string, updateContactDto: UpdateContactDto): Promise<ContactOutputDto | null> {
    const hasContact = await this.contactRepository.hasContact(email)

    if (!hasContact) {
      return null
    }

    const buildUpdateContact = this.contactBuilder.buildUpdateContact(updateContactDto)

    return await this.contactRepository.update(email, buildUpdateContact)
  }

  async delete (email: string): Promise<void> {
    await this.contactRepository.delete(email)
  }
}
