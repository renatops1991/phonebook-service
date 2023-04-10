import { CreateContactDto } from './create-contact.dto'
import { WeatherDto } from './weather.dto'

export interface ContactOutputDto extends CreateContactDto {
  id: string
  description?: string
  weather?: WeatherDto
}
