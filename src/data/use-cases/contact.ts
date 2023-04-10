import { IContact } from '@/domain/protocols/contact'
import { FilterContactDto, UpdateContactDto } from '@/main/dtos'
import { ContactOutputDto } from '@/main/dtos/contact-output.dto'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { IContactBuilder } from '../protocols/contact-builder'
import { IContactRepository } from '../protocols/contact-repository'
import { IHttpRequest } from '../protocols/http-request'
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
    const buildedContact = this.contactBuilder?.buildContact(contactDto) as CreateContactDto
    const contact = await this.contactRepository.create(buildedContact)
    return contact
  }

  async fetchContacts (filterContactDto: FilterContactDto): Promise<ContactOutputDto[]> {
    const contactsWithWeather: ContactOutputDto[] = []
    const contacts = await this.contactRepository.fetchContacts(filterContactDto)

    for (const contact of contacts) {
      const weather = await this.httpRequest.read(`&city_name=${contact.address.city},${contact.address.state}`)
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { temp, date, currently, description, humidity, cloudiness, rain, condition_code } = weather.data.results

      contactsWithWeather.push({
        ...contact,
        description: this.makeTemperatureMessage(temp, condition_code),
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

  private makeTemperatureMessage (temperature: number, condition: string): string {
    if (temperature <= 18) {
      return 'Ofereça um chocolate quente ao seu contato...'
    }
    if (temperature >= 30 && condition === '32') {
      return 'Convide seu contato para ir à praia com esse calor!'
    }
    if (temperature >= 30 && condition === '45') {
      return ' Convide seu contato para tomar um sorvete'
    }
    if ((temperature > 18 && temperature < 30) && condition === '32') {
      return ' Convide seu contato para fazer alguma atividade ao livre'
    }
    if ((temperature > 18 && temperature < 30) && condition === '45') {
      return 'Convide seu contato para ver um filme'
    }

    return 'Convide seu contato para fazer uma caminhada'
  }
}
