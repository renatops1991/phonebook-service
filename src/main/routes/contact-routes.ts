import { ContactBuilder } from '@/data/builders/contact-builder'
import { Contact } from '@/data/use-cases/contact'
import { ContactRepositoryMongoAdapter } from '@/infra/mongodb/contact-repository-mongo-adapter'
import { CreateContact } from '@/presentation/controllers/create-contact'
import { expressAdapter } from '../adapters/express-adapter'
import { Router } from 'express'
import { makeValidationFactory } from '../factories/validation-factory'

export default (router: Router): void => {
  const contact = new Contact(new ContactRepositoryMongoAdapter(), new ContactBuilder())
  const validationFactory = makeValidationFactory()

  router.post('/contact', expressAdapter(new CreateContact(contact, validationFactory)))
}
