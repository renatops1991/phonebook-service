import { DeleteContact } from '@/presentation/controllers/delete-contact'
import { contactUseCaseStub } from '@/tests/unit/mocks/mock-contact'
import { mockValidation } from '@/tests/unit/mocks/mock-validate'
import { fixtureContact } from '../../fixtures/fixturesContact'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-protocols-helper'
import { ServerError } from '@/presentation/errors/server-error'
import { DeleteContactDto } from '@/main/dtos/delete-contact.dto'

const validationStub = mockValidation()
const contactStub = contactUseCaseStub()
const sut = new DeleteContact(contactStub, validationStub)

describe('DeleteContactController', () => {
  const fixtureContactEmail: DeleteContactDto = { email: fixtureContact().email }
  it('Should call delete method of the usecase', async () => {
    const deleteSpy = jest
      .spyOn(contactStub, 'delete')
    await sut.handle(fixtureContactEmail)
    expect(deleteSpy).toHaveBeenCalledWith(fixtureContact().email)
  })

  it('Should call validate method of the validation composite with correct value', async () => {
    const validateSpy = jest
      .spyOn(validationStub, 'validate')
    await sut.handle(fixtureContactEmail)
    expect(validateSpy).toHaveBeenCalledWith(fixtureContact().email)
  })

  it('Should return bad request error if validate method returns error', async () => {
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new EmailInUseError().serializeErrors())
    const expectedResponse = await sut.handle(fixtureContactEmail)
    expect(expectedResponse).toEqual(badRequest(new EmailInUseError().serializeErrors()))
  })

  it('Should return internal server error if delete method throw exception error', async () => {
    jest
      .spyOn(contactStub, 'delete')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(fixtureContactEmail)
    expect(expectedResponse.statusCode).toEqual(500)
    expect(expectedResponse.body.message).toEqual('Internal Server Error')
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should return 204 status code if delete method on succeeds', async () => {
    const expectedResponse = await sut.handle(fixtureContactEmail)
    expect(expectedResponse.statusCode).toEqual(204)
    expect(expectedResponse).toEqual(noContent())
  })
})
