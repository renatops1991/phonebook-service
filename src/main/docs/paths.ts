import { contactPath, fetchContactsPath, updateContactPath } from './paths/'

export default {
  '/contact': contactPath,
  '/contacts': fetchContactsPath,
  '/contact/{email}': updateContactPath
}
