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
      const weather = await this.httpRequest.read(`&city_name=${contact.address.city},${contact.address.state}`)

      const { temp, date, currently, description, humidity, cloudiness, rain } = weather.data.results

      contactsWithWeather.push({
        ...contact,
        description: utils.makeDescriptionWeatherByTemperature(temp, weather.data.results?.condition_code),
        weather: {
          temperature: temp ?? null,
          date: new Date(date) ?? new Date(),
          currently: currently ?? null,
          description: description ?? null,
          humidity: humidity ?? null,
          cloudiness: cloudiness ?? null,
          rain: rain ?? null
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
}
