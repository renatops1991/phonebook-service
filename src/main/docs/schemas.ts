import { contactsSchema, createContactParamsSchema } from './schemas/'

export default {
  contact: createContactParamsSchema,
  contacts: contactsSchema
}
