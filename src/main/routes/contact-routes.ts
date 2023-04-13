import { ContactBuilder } from '@/data/builders/contact-builder'
import { Contact } from '@/data/use-cases/contact'
import { ContactRepositoryMongoAdapter } from '@/infra/mongodb/contact-repository-mongo-adapter'
import { CreateContact } from '@/presentation/controllers/create-contact'
import { expressAdapter } from '../adapters/express-adapter'
import { Router } from 'express'
import { makeCreateValidationFactory, makeDeleteValidationFactory, makeFetchValidationFactory, makeUpdateValidationFactory } from '../factories/validation-factory'
import { FetchContact } from '@/presentation/controllers/fetch-contact'
import { UpdateContact } from '@/presentation/controllers/update-contact'
import { AxiosAdapter } from '@/infra/axios/axios-adapter'
import { HttpConfigType } from '@/data/types/http-types'
import { DeleteContact } from '@/presentation/controllers/delete-contact'

export default (router: Router): void => {
  const axiosConfig: HttpConfigType = {
    baseURL: `${process.env.HG_BRASIL_URI}`
  }
  const contact = new Contact(
    new ContactRepositoryMongoAdapter(),
    new ContactBuilder(),
    new AxiosAdapter(axiosConfig)
  )

  router.post('/contact', expressAdapter(new CreateContact(contact, makeCreateValidationFactory())))
  router.get('/contacts', expressAdapter(new FetchContact(contact, makeFetchValidationFactory())))
  router.put('/contact/:email', expressAdapter(new UpdateContact(contact, makeUpdateValidationFactory())))
  router.delete('/contact/:email', expressAdapter(new DeleteContact(contact, makeDeleteValidationFactory())))
}
