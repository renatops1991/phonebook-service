import {
  contactsSchema,
  createContactParamsSchema,
  updateContactParamsSchema
} from './schemas/'

export default {
  contact: createContactParamsSchema,
  contacts: contactsSchema,
  updateContact: updateContactParamsSchema
}
