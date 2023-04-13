import { DeleteContact } from '@/presentation/controllers/delete-contact'
import { contactUseCaseStub } from '@/tests/unit/mocks/mock-contact'
import { mockValidation } from '@/tests/unit/mocks/mock-validate'
import { fixtureContact } from '../../fixtures/fixturesContact'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { badRequest, serverError } from '@/presentation/helpers/http-protocols-helper'
import { ServerError } from '@/presentation/errors/server-error'

const validationStub = mockValidation()
const contactStub = contactUseCaseStub()
const sut = new DeleteContact(contactStub, validationStub)

describe('DeleteContactController', () => {
  it('Should call delete method of the usecase', async () => {
    const deleteSpy = jest
      .spyOn(contactStub, 'delete')
    await sut.handle(fixtureContact().email)
    expect(deleteSpy).toHaveBeenCalledWith(fixtureContact().email)
  })

  it('Should call validate method of the validation composite with correct value', async () => {
    const validateSpy = jest
      .spyOn(validationStub, 'validate')
    await sut.handle(fixtureContact().email)
    expect(validateSpy).toHaveBeenCalledWith(fixtureContact().email)
  })

  it('Should return bad request error if validate method returns error', async () => {
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new EmailInUseError().serializeErrors())
    const expectedResponse = await sut.handle(fixtureContact().email)
    expect(expectedResponse).toEqual(badRequest(new EmailInUseError().serializeErrors()))
  })

  it('Should return internal server error if delete method throw exception error', async () => {
    jest
      .spyOn(contactStub, 'delete')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(fixtureContact().email)
    expect(expectedResponse.statusCode).toEqual(500)
    expect(expectedResponse.body.message).toEqual('Internal Server Error')
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })
})
