import { ContactBuilder } from '@/data/builders/contact-builder'
import { Contact } from '@/data/use-cases/contact'
import { ContactRepositoryMongoAdapter } from '@/infra/mongodb/contact-repository-mongo-adapter'
import { CreateContact } from '@/presentation/controllers/create-contact'
import { expressAdapter } from '../adapters/express-adapter'
import { Router } from 'express'
import { makeCreateValidationFactory, makeFetchValidationFactory } from '../factories/validation-factory'
import { FetchContact } from '@/presentation/controllers/fetch-contact'

export default (router: Router): void => {
  const contact = new Contact(new ContactRepositoryMongoAdapter(), new ContactBuilder())

  router.post('/contact', expressAdapter(new CreateContact(contact, makeCreateValidationFactory())))
  router.get('/contacts', expressAdapter(new FetchContact(contact, makeFetchValidationFactory())))
}
