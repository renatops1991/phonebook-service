import { FetchContact } from '@/presentation/controllers/fetch-contact'
import { InvalidFilterError } from '@/presentation/errors/invalid-filter-error'
import { NotFoundError } from '@/presentation/errors/not-found-error'
import { ServerError } from '@/presentation/errors/server-error'
import { badRequest, notFound, serverError } from '@/presentation/helpers/http-protocols-helper'
import { fixtureContactOutput, fixtureFilterContact } from '@/tests/unit/fixtures/fixturesContact'
import { contactUseCaseStub } from '@/tests/unit/mocks/mock-contact'
import { mockValidation } from '@/tests/unit/mocks/mock-validate'

const validationStub = mockValidation()
const contactStub = contactUseCaseStub()
const sut = new FetchContact(contactStub, validationStub)
describe('FetchContactController', () => {
  it('Should call fetchContacts method of the Contact UseCase with correct values', async () => {
    const createContactSpy = jest
      .spyOn(contactStub, 'fetchContacts')
    await sut.handle(fixtureFilterContact())
    expect(createContactSpy).toHaveBeenCalledWith(fixtureFilterContact())
  })

  it('Should return 500 error if fetchContacts method throw exception error', async () => {
    jest
      .spyOn(contactStub, 'fetchContacts')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(fixtureFilterContact())
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse.body.message).toEqual('Internal Server Error')
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should return 404 error if fetchContacts method of the Contact UseCase returns empty', async () => {
    jest
      .spyOn(contactStub, 'fetchContacts')
      .mockResolvedValueOnce([])
    const expectedResponse = await sut.handle(fixtureFilterContact())
    expect(expectedResponse.statusCode).toBe(404)
    expect(expectedResponse).toEqual(notFound(new NotFoundError().serializeErrors()))
  })

  it('Should return 400 error if filter no exists', async () => {
    const filterContactDto = {
      fistName: 'John foo bar'
    }
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new InvalidFilterError().serializeErrors())
    const expectedResponse = await sut.handle(filterContactDto as any)
    expect(expectedResponse).toEqual(badRequest(new InvalidFilterError().serializeErrors()))
  })

  it('Should return success if create method on succeeds', async () => {
    const expectedResponse = await sut.handle(fixtureFilterContact())
    expect(expectedResponse.statusCode).toBe(200)
    expect(expectedResponse.body).toEqual([fixtureContactOutput()])
  })
})
