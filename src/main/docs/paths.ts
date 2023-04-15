import {
  contactPath,
  deleteContactPath,
  fetchContactsPath,
  updateContactPath
} from './paths/'

export default {
  '/contact': contactPath,
  '/contacts': fetchContactsPath,
  '/contact/{email}': updateContactPath,
  '/contact/remove/{email}': deleteContactPath
}
